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
            <b-field label="Telefono" message="Campo Requerido" horizontal>
              <b-input
                v-model="phoneToEdit"
                placeholder="e.g. 614-123-45-67"
                required
              />
            </b-field>
            <b-field label="Codigo de Acceso" horizontal>
              <b-input v-model="form.codigo" placeholder="-" readonly />
            </b-field>
            <!-- <b-field label="City" message="Client's city" horizontal>
              <b-input
                v-model="form.city"
                placeholder="e.g. Geoffreyton"
                required
              />
            </b-field> -->
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
              <router-link slot="right" to="/" class="button is-danger">
                Cancelar
              </router-link>
            </div>
          </form>
        </card-component>
        <card-component
          v-if="isProfileExists"
          title="Client Profile"
          icon="account"
          class="tile is-child"
        >
          <user-avatar
            :avatar="form.avatar"
            class="image has-max-width is-aligned-center"
          />
          <hr />
          <b-field label="Nombre">
            <b-input :value="form.nombre" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Telefono">
            <b-input :value="form.telefono" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Codigo de Acceso">
            <b-input :value="form.codigo" custom-class="is-static" readonly />
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
// import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import FilePicker from '@/components/FilePicker'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'ClientForm',
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
      nameToEdit: null,
      phoneToEdit: null
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'Nuevo Paciente'
      }

      return ['Hospital', 'Paciente', lastCrumb]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Nuevo Paciente'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'client.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nuevo Paciente'
      } else {
        return 'Dashboard'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Edit Client'
      } else {
        return 'Nuevo Paciente'
      }
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
        this.nameToEdit = null
        this.phoneToEdit = null
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
          url: 'https://patas-app.herokuapp.com/api/paciente/esp',
          params: {
            id: this.$route.params.id
          }
        })
          .then(r => {
            const item = r.data

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.nameToEdit = item.nombre
              this.phoneToEdit = item.telefono
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(
                new Date(item.created_mm_dd_yyyy)
              ).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'client.new' })
            }
          })
          .catch(e => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    updateData () {
      if (this.isProfileExists) {
        axios({
          method: 'PUT',
          url: 'https://patas-app.herokuapp.com/api/paciente/esp',
          params: {
            id: this.$route.params.id
          },
          data: {
            nombre: this.nameToEdit,
            telefono: this.phoneToEdit
          }
        }).then(r => {
          const item = r.data

          if (item) {
            this.isProfileExists = true
            this.form = item
            this.nameToEdit = item.nombre
            this.phoneToEdit = item.telefono
            this.form.created_date = new Date(item.created_mm_dd_yyyy)
            this.createdReadable = dayjs(
              new Date(item.created_mm_dd_yyyy)
            ).format('MMM D, YYYY')
          } else {
            this.$router.push({ name: 'client.new' })
          }
        })
      } else {
        axios({
          method: 'POST',
          url: 'https://patas-app.herokuapp.com/api/paciente/signup',
          data: {
            nombre: this.nameToEdit,
            telefono: this.phoneToEdit,
            doctor: this.$store.state.userId
          }
        }).then(r => {
          const item = r.data

          if (item) {
            this.isProfileExists = true
            this.form = item
            this.nameToEdit = item.nombre
            this.phoneToEdit = item.telefono
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
        url: 'https://patas-app.herokuapp.com/api/paciente/esp',
        params: {
          id: this.$route.params.id
        }
      }).then(r => {
        this.$router.push({ name: 'home' })
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
          message: 'Demo only',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
