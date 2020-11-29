<template>
  <div class="login-container">
    <h1 class="title has-text-centered">Doctor</h1>
    <div class="columns is-gapless">
      <div class="column"></div>
      <div class="column">
        <div class="field">
          <label class="label">Nombre de usuario</label>
          <div class="control">
            <input class="input" type="text" v-model="username" />
          </div>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <div class="control">
            <input class="input" type="password" v-model="password" />
          </div>
        </div>
        <div class="control has-text-centered">
          <button class="button" v-on:click="login()">Ingresar</button>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store
        .dispatch('loginDoctor', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  .title {
    padding-bottom: 2em;
  }
  padding-top: 10em;
}
</style>
