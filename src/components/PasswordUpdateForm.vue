<template>
  <card-component title="Actualizar Contraseña" icon="lock">
    <form @submit.prevent="submit">
      <b-field horizontal label="Contraseña Actual" message="Campo Requerido">
        <b-input
          v-model="form.password_current"
          name="password_current"
          type="password"
          required
          autcomplete="current-password"
        />
      </b-field>
      <hr />
      <b-field horizontal label="Nueva Contraseña" message="Campo Requerido">
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <b-field
        horizontal
        label="Confirmar Nueva Contraseña"
        message="Campo Requerido"
      >
        <b-input
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <hr />
      <b-field horizontal>
        <div class="control footer-menu-profile">
          <button
            :disabled="samePassword"
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
import CardComponent from '@/components/CardComponent'
import axios from 'axios'
export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        password_current: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  computed: {
    samePassword () {
      if (this.form.password === null) {
        return true
      }
      if (this.form.password_current === null) {
        return true
      }
      if (this.form.password !== this.form.password_confirmation) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      axios({
        method: 'PUT',
        url: `https://patas-app.herokuapp.com/api/doctor/update/password/${this.$store.state.userId}`,
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        },
        data: {
          password: this.form.password_current,
          newPassword: this.form.password
        }
      })
        .then(() => {
          setTimeout(() => {
            this.isLoading = false
            this.$buefy.snackbar.open(
              {
                message: 'Updated',
                queue: false
              },
              500
            )
          })
        })
        .catch(() => {
          this.$buefy.snackbar.open(
            {
              message: 'Error',
              queue: false
            },
            500
          )
          this.isLoading = false
        })
    }
  }
}
</script>
