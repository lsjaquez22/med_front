<template>
  <div>
    <!-- <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    /> -->
    <!-- <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients"
    > -->
    <b-table
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients"
    >
      <b-table-column cell-class="has-no-head-mobile is-image-cell" v-slot="props">
        <div class="image">
          <img :src="props.row.avatar" class="is-rounded">
        </div>
      </b-table-column>
      <b-table-column cell-class="link-name" label="Nombre" field="name" sortable v-slot="props">
        <div v-on:click="showPacient(props.row.id)" >{{ props.row.nombre }}</div>
      </b-table-column>
      <b-table-column label="Telefono" field="company" sortable v-slot="props">
        {{ props.row.telefono }}
      </b-table-column>
      <!-- <b-table-column label="City" field="city" sortable v-slot="props">
        {{ props.row.city }}
      </b-table-column> -->
      <!-- <b-table-column cell-class="is-progress-col" label="Progress" field="progress" sortable v-slot="props">
        <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
      </b-table-column>
      <b-table-column label="Created" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
      </b-table-column> -->
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'client.edit', params: {id: props.row.id}}" class="button is-small is-primary">
            <b-icon icon="account-edit" size="is-small"/>
          </router-link>
          <!-- <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
            <b-icon icon="trash-can" size="is-small"/>
          </button> -->
        </div>
      </b-table-column>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Obteniendo informacion de tus pacientes...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Error de conexión&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ClientsTableSample',
  components: { },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios({
        method: 'GET',
        url: 'https://patas-app.herokuapp.com/api/pacientes',
        params: {
          id: this.$store.state.userId
        }
      }).then((r) => {
        this.isLoading = false
        // if (r.data && r.data.data) {
        //   if (r.data.data.length > this.perPage) {
        //     this.paginated = true
        //   }
        this.clients = r.data
        // }
      }).catch((e) => {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger'
        })
      })
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    showPacient (userID) {
      this.$router.push({ name: 'paciente', params: { id: userID } })
    }
  }
}
</script>
