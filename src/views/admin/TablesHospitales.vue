<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <!-- <hero-bar>
      Tables
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar> -->
    <hero-bar>
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <!-- <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated table.</b>&nbsp;Based on Buefy's table.
        </div>
      </notification> -->
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Hospitales"
        icon="hospital-building"
      >
        <hospital-table-sample
          :data-url="`${$router.options.base}data-sources/hospitales.json`"
          :checkable="true"
        />
      </card-component>

      <hr />

      <!-- <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          :data-url="`${$router.options.base}data-sources/clients.json`"
          :checkable="true"
        />
      </card-component>

      <hr /> -->

      <!-- <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification>

      <card-component class="has-table has-thead-hidden">
        <clients-table-sample />
      </card-component> -->
    </section>
  </div>
</template>

<script>
import HospitalTableSample from '@/components/admin/HospitalTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'Tables',
  components: {
    TitleBar,
    CardComponent,
    HospitalTableSample,
    HeroBar
  },
  computed: {
    titleStack () {
      return ['Hospitales']
    },
    heroRouterLinkTo () {
      return { name: 'hospital.new' }
    },
    heroRouterLinkLabel () {
      return 'Nuevo Hospital'
    }
  }
}
</script>
