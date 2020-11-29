<template>
  <card-component title="Editar Perfil" icon="account-circle">
    <form @submit.prevent="submit">
      <b-field horizontal label="Avatar">
        <file-picker />
      </b-field>
      <hr />
      <b-field horizontal label="Nombre" message="Campo Requerido">
        <b-input v-model="form.name" name="name" required />
      </b-field>
      <b-field horizontal label="Correo" message="Campo Requerido">
        <b-input v-model="form.email" name="email" type="email" required />
      </b-field>
      <hr />
      <b-field horizontal>
        <div class="control footer-menu-profile">
          <button
            type="submit"
            class="button is-success"
            :class="{ 'is-loading': isLoading }"
          >
            Guardar
          </button>
          <router-link slot="right" to="/" class="button is-danger">
            Cancelar
          </router-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { mapState } from 'vuex'
import FilePicker from '@/components/FilePicker'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent,
    FilePicker
  },
  data () {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        name: null,
        email: null
      }
    }
  },
  computed: {
    ...mapState(['userName', 'userEmail'])
  },
  watch: {
    userName (newValue) {
      this.form.name = newValue
    },
    userEmail (newValue) {
      this.form.email = newValue
    }
  },
  mounted () {
    this.form.name = this.userName
    this.form.email = this.userEmail
  },
  methods: {
    submit () {
      this.isLoading = true
      this.$store
        .dispatch('updateUser', {
          username: this.form.name,
          email: this.form.email
        })
        .then(() => {
          setTimeout(() => {
            this.isLoading = false
            this.$store.commit('user', this.form)
            this.$buefy.snackbar.open({
              message: 'Updated',
              queue: false
            })
          }, 500)
        }).catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
