<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <card-component title="Client Profile" icon="account" class="tile is-child">
      <user-avatar
        :avatar="this.pacient.avatar"
        class="image has-max-width is-aligned-center"
      />
      <hr />
      <b-field label="Nombre">
        <b-input
          :value="this.pacient.nombre"
          custom-class="is-static"
          readonly
        />
      </b-field>
      <b-field label="Telefono">
        <b-input
          :value="this.pacient.telefono"
          custom-class="is-static"
          readonly
        />
      </b-field>
      <b-field label="Codigo de Acceso">
        <b-input
          :value="this.pacient.codigo"
          custom-class="is-static"
          readonly
        />
      </b-field>
    </card-component>
    <div class="container_results">
      <div class="columns result_titles">
        <div class="column is-2">
          <b>Imagen</b>
        </div>
        <div class="column is-2">
          <b>Fecha</b>
        </div>
        <div class="column is-2">
          <b>Resultado</b>
        </div>
        <div class="column is-6">
          <b>Comentarios</b>
        </div>
      </div>
      <section class="card_result">
        <article
          class="message is-link"
          v-for="item in history"
          :key="item._id"
        >
          <div class="message-body">
            <div class="columns">
              <div class="column is-2">
                <figure class="image">
                  <img v-bind:src="'data:image/jpeg;base64,' + item.foto" v-on:click="openModal(item.foto)" />
                </figure>
              </div>
              <div class="column is-2">
                <b-field>
                  <b-input
                    :value="item.fecha"
                    disabled
                    type="search"
                    icon="calendar-today"
                  >
                  </b-input>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field>
                  <b-select :value="item.resultado" disabled>
                    <option value="0">Categoria 0</option>
                    <option value="1">Categoria 1</option>
                    <option value="2">Categoria 2</option>
                    <option value="3">Categoria 3</option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-6">
                <div class="columns">
                  <div class="column is-9">
                    <b-field>
                      <b-input v-model="item.comentario"></b-input>
                    </b-field>
                  </div>
                  <div class="column is-3 save_comment">
                    <button
                      class="button is-primary "
                      v-on:click="updateComment(item._id, item.comentario)"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
    <div v-if="stateModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="image">
          <img v-bind:src="'data:image/jpeg;base64,' + imageToShow" alt="" />
        </p>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="closeModal()"></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import CardComponent from '@/components/CardComponent'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Paciente',
  data () {
    return {
      dataUrl: '/data-sources/clients.json',
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      pacient: {},
      history: [],
      stateModal: false,
      imageToShow: null
    }
  },
  components: {
    TitleBar,
    HeroBar,
    CardComponent,
    UserAvatar
  },
  computed: {
    titleStack () {
      return ['Hospital', 'Paciente', 'Historial', this.pacient.nombre]
    },
    heroRouterLinkTo () {
      return { name: 'home' }
    },
    heroRouterLinkLabel () {
      return 'Dashboard'
    }
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios({
        method: 'GET',
        url: 'https://patas-app.herokuapp.com/api/paciente/esp',
        params: {
          id: this.$route.params.id
        }
      })
        .then(r => {
          this.pacient = r.data
        })
        .catch(e => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      axios({
        method: 'GET',
        url: 'https://patas-app.herokuapp.com/api/historial',
        params: {
          id: this.$route.params.id
        }
      })
        .then(r => {
          this.history = r.data
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
  methods: {
    updateComment (idRegister, comment) {
      axios({
        method: 'PUT',
        url: 'https://patas-app.herokuapp.com/api/historial/comentario',
        params: {
          id: idRegister
        },
        data: {
          comentario: comment
        }
      })
        .then(r => {
          const indexToEdit = this.history.findIndex(
            element => element._id === idRegister
          )
          this.history[indexToEdit] = r.data
        })
        .catch(e => {
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger',
            queue: false
          })
        })
    },
    closeModal () {
      this.stateModal = false
    },
    openModal (img) {
      this.stateModal = true
      this.imageToShow = img
    }
  }
}
</script>
