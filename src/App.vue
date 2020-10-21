<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
    <!-- <footer-bar /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      if (this.$route.meta.admin) {
        return [
          'Admin',
          [
            {
              to: '/admin',
              icon: 'hospital-building',
              label: 'Hospitales'
            },
            {
              to: '/admin/doctores',
              icon: 'clipboard-account',
              label: 'Doctores'
            }
          ]
        ]
      } else {
        return [
          'Hospital',
          [
            {
              to: '/',
              icon: 'desktop-mac',
              label: 'Pacientes'
            }
          ]
        // 'Examples',
        // [
        //   {
        //     to: '/tables',
        //     label: 'Tables',
        //     icon: 'table',
        //     updateMark: true
        //   },
        //   {
        //     to: '/forms',
        //     label: 'Forms',
        //     icon: 'square-edit-outline'
        //   },
        //   {
        //     to: '/profile',
        //     label: 'Profile',
        //     icon: 'account-circle'
        //   },
        //   {
        //     label: 'Submenus',
        //     subLabel: 'Submenus Example',
        //     icon: 'view-list',
        //     menu: [
        //       {
        //         href: '#void',
        //         label: 'Sub-item One'
        //       },
        //       {
        //         href: '#void',
        //         label: 'Sub-item Two'
        //       }
        //     ]
        //   }
        // ],
        // 'About',
        // [
        //   {
        //     href: 'https://admin-one.justboil.me',
        //     label: 'Premium Demo',
        //     icon: 'credit-card'
        //   },
        //   {
        //     href: 'https://justboil.me/bulma-admin-template/one',
        //     label: 'About',
        //     icon: 'help-circle'
        //   }
        // ]
        ]
      }
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  }
}
</script>
