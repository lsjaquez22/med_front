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
      <b-field label="Telefono">
        <b-input
          :value="this.pacient.company"
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
        <b-message type="is-info">
          <div class="columns">
            <div class="column is-2">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
            </div>
            <div class="column is-2">
              <b-field>
                <b-input
                  value="01/01/2020"
                  disabled
                  type="search"
                  icon="calendar-today"
                >
                </b-input>
              </b-field>
            </div>
            <div class="column is-2">
              <b-field>
                <b-select value="1" disabled>
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
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-3 save_comment">
                  <button class="button is-primary ">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </b-message>
        <b-message type="is-danger">
          <div class="columns">
            <div class="column is-2">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
            </div>
            <div class="column is-2">
              <b-field>
                <b-input
                  value="01/01/2020"
                  disabled
                  type="search"
                  icon="calendar-today"
                >
                </b-input>
              </b-field>
            </div>
            <div class="column is-2">
              <b-field>
                <b-select value="3" disabled>
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
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-3 save_comment">
                  <button class="button is-primary ">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </b-message>
        <b-message type="is-warning">
          <div class="columns">
            <div class="column is-2">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
            </div>
            <div class="column is-2">
              <b-field>
                <b-input
                  value="01/01/2020"
                  disabled
                  type="search"
                  icon="calendar-today"
                >
                </b-input>
              </b-field>
            </div>
            <div class="column is-2">
              <b-field>
                <b-select value="2" disabled>
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
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-3 save_comment">
                  <button class="button is-primary ">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </b-message>
      </section>
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
      pacient: {}
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
      return ['Hospital', 'Paciente', 'Historial', this.pacient.name]
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
      axios
        .get(this.dataUrl)
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.pacient = r.data.data.find(
              element => element.id === parseInt(this.$route.params.id)
            )
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
