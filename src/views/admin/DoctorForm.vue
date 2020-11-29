<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      <!-- {{ heroTitle }} -->
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <!-- <notification class="is-info">
        <div>
          <span><b>Demo only.</b> No data will be saved/updated</span>
        </div>
      </notification> -->
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <!-- <b-field label="ID" horizontal>
              <b-input v-model="form.id" custom-class="is-static" readonly />
            </b-field>
            <hr /> -->
            <b-field label="Avatar" horizontal>
              <file-picker />
            </b-field>
            <hr />
            <b-field label="Nombre" message="Campo Requerido" horizontal>
              <b-input
                v-model="nameToEdit"
                placeholder="e.g. John Doe"
                required
              />
            </b-field>
            <b-field label="Correo" message="Campo Requerido" horizontal>
              <b-input
                v-model="emailToEdit"
                placeholder="e.g. Geoffreyton"
                required
              />
            </b-field>
            <b-field label="Contrañsea" horizontal>
              <b-input
                v-model="newPassword"
                type="password"
              />
            </b-field>
            <b-field label="Hospital" message="Campo Requerido" horizontal>
              <b-select
                v-model="hospitalToEdit"
                placeholder="Seleccionar Hospital"
                required
              >
                <option
                  v-for="(hospital, index) in hospitales"
                  :key="index"
                  :value="hospital.name"
                >
                  {{ hospital.name }}
                </option>
              </b-select>
            </b-field>
            <!-- <b-field label="Created" horizontal>
              <b-datepicker
                v-model="form.created_date"
                placeholder="Click to select..."
                icon="calendar-today"
                @input="input"
              >
              </b-datepicker>
            </b-field> -->
            <!-- <hr />
            <b-field label="Progress" horizontal>
              <b-slider v-model="form.progress" />
            </b-field> -->
            <hr />
            <div class="footer-menu-cliente">
              <b-field horizontal>
                <b-button
                  type="is-success"
                  :loading="isLoading"
                  native-type="submit"
                  v-on:click="updateData()"
                  >Guardar</b-button
                >
              </b-field>
              <!-- <b-field horizontal>
                <b-button
                  type="is-danger"
                  :loading="isLoading"
                  native-type="submit"
                  >Cancelar</b-button
                >
              </b-field> -->
              <router-link slot="right" to="/admin/doctores" class="button is-danger">
                Cancelar
              </router-link>
            </div>
          </form>
        </card-component>
        <card-component
          v-if="isProfileExists"
          title="Doctor Profile"
          icon="account"
          class="tile is-child"
        >
          <user-avatar
            :avatar="form.avatar"
            class="image has-max-width is-aligned-center"
          />
          <hr />
          <b-field label="Nombre">
            <b-input :value="form.username" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Hospital">
            <b-input :value="form.hospital" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Correo">
            <b-input :value="form.email" custom-class="is-static" readonly />
          </b-field>
          <hr />
          <b-field>
            <b-button
              type="is-danger"
              :loading="isLoading"
              native-type="submit"
              v-on:click="deleteData()"
              >Borrar</b-button
            >
          </b-field>
          <!-- <b-field label="City">
            <b-input :value="form.city" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Created">
            <b-input
              :value="createdReadable"
              custom-class="is-static"
              readonly
            />
          </b-field> -->
          <!-- <hr /> -->
          <!-- <b-field label="Progress">
            <progress
              class="progress is-small is-primary"
              :value="form.progress"
              max="100"
              >{{ form.progress }}</progress
            >
          </b-field> -->
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import FilePicker from '@/components/FilePicker'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'DoctorForm',
  components: {
    UserAvatar,
    FilePicker,
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
      formToEdit: this.getClearFormObject(),
      nameToEdit: null,
      emailToEdit: null,
      newPassword: null,
      hospitalToEdit: null,
      hospitales: []
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'Nuevo Doctor'
      }

      return ['Hospital', 'Doctores', lastCrumb]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Nuevo Doctor'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'doctor.new' }
      } else {
        return '/admin/doctores'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nuevo Doctor'
      } else {
        return 'Dashboard Doctores'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Edit Doctor'
      } else {
        return 'Nuevo Doctor'
      }
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
        this.nameToEdit = null
        this.emailToEdit = null
        this.newPassword = null
        this.hospitalToEdit = null
      } else {
        this.getData()
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
        progress: 0
      }
    },
    getData () {
      if (this.$route.params.id) {
        axios({
          method: 'GET',
          url: `https://patas-app.herokuapp.com/api/doctors/get/${this.$route.params.id}`,
          headers: {
            'x-access-token': localStorage.getItem('jwt')
          }
        })
          .then((r) => {
            const item = r.data

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.nameToEdit = item.username
              this.emailToEdit = item.email
              this.hospitalToEdit = item.hospital
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(
                new Date(item.created_mm_dd_yyyy)
              ).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'hospital.new' })
            }
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
      axios({
        method: 'GET',
        url: 'https://patas-app.herokuapp.com/api/hospital',
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        }
      })
        .then((r) => {
          this.hospitales = r.data
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    updateData () {
      if (this.isProfileExists) {
        axios({
          method: 'PUT',
          url: `https://patas-app.herokuapp.com/api/doctor/update/${this.$route.params.id}`,
          headers: {
            'x-access-token': localStorage.getItem('jwt')
          },
          data: {
            username: this.nameToEdit,
            email: this.emailToEdit,
            hospital: this.hospitalToEdit
          }
        }).then((r) => {
          const item = r.data

          if (item) {
            this.isProfileExists = true
            this.form = item
            this.nameToEdit = item.username
            this.emailToEdit = item.email
            this.hospitalToEdit = item.hospital
            this.form.created_date = new Date(item.created_mm_dd_yyyy)
            this.createdReadable = dayjs(
              new Date(item.created_mm_dd_yyyy)
            ).format('MMM D, YYYY')
          } else {
            this.$router.push({ name: 'hospital.new' })
          }
        })
      } else {
        axios({
          method: 'POST',
          url: 'https://patas-app.herokuapp.com/api/admin/signup',
          headers: {
            'x-access-token': localStorage.getItem('jwt')
          },
          data: {
            username: this.nameToEdit,
            email: this.emailToEdit,
            hospital: this.hospitalToEdit,
            password: this.newPassword
          }
        }).then(r => {
          const item = r.data
          if (item) {
            this.isProfileExists = true
            this.form = item
            this.nameToEdit = item.username
            this.emailToEdit = item.email
            this.hospitalToEdit = item.hospital
            this.form.created_date = new Date(item.created_mm_dd_yyyy)
            this.createdReadable = dayjs(
              new Date(item.created_mm_dd_yyyy)
            ).format('MMM D, YYYY')
          } else {
            this.$router.push({ name: 'client.new' })
          }
        })
      }
    },
    deleteData () {
      axios({
        method: 'DELETE',
        url: `https://patas-app.herokuapp.com/api/doctor/delete/${this.$route.params.id}`,
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        }
      }).then(r => {
        this.$router.push({ name: 'Doctores admin' })
      })
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'OK',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
