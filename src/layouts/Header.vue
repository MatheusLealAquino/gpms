<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header reveal :reveal-offset="1">
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <div class="row q-mr-sm">
          <div class="col-md-12 col-sm-7">
            <q-toolbar-title>
              Academy UFF
            </q-toolbar-title>
          </div>
        </div>
        <q-btn-dropdown :disabled="this.cartItems" icon="shopping_cart" flat class="q-ml-auto">
          <div
            style="height:10vh; padding:20px"
            v-for="item in this.cartItems"
            :key="item.id">
            {{ item }}
          </div>
        </q-btn-dropdown>
        <div v-if="userLogged && userState.name">
          Olá, {{userState.name}}
        </div>
        <div v-if="$q.platform.is.desktop && !userLogged">
          <q-btn color="white" outline label="Fazer Login" class="q-mr-sm"  @click="openSignIn=!openSignIn"/>
          <q-btn color="negative" label="Cadastre-se" @click="openSignUp=!openSignUp" />
        </div>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item>
          <q-btn color="black" icon="home" flat label="Início" class="q-mr-sm" to="/"/>
        </q-item>
        <q-item>
          <q-btn color="black" icon="timeline" flat label="Timeline" class="q-mr-sm" to="/timeline"/>
        </q-item>
        <q-item v-if="userLogged">
          <q-btn color="black" icon="book" flat label="Meus cursos" class="q-mr-sm" to="/myCourses"/>
        </q-item>
        <q-item v-if="!userLogged">
          <q-btn color="black" icon="input" flat label="Cadastre-se" class="q-mr-sm" @click="openSignUp=!openSignUp"/>
        </q-item>
        <q-item v-if="!userLogged">
          <q-btn color="black" icon="settings_power" flat label="Logar" class="q-mr-sm" @click="openSignIn=!openSignIn"/>
        </q-item>
        <q-item v-if="userLogged">
          <q-btn color="black" icon="exit_to_app" flat label="Sair" class="q-mr-sm" @click="makeLogout"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-modal v-model="openSignUp">
      <div class="q-pl-md q-pr-md q-pb-md">
        <h3>Cadastre-se</h3>
        <q-input class="q-mb-md" v-model="user.realm" float-label="Nome" placeholder="Gigi" />
        <q-input class="q-mb-md" v-model="user.username" float-label="Usuário" placeholder="Gigi" />
        <q-input class="q-mb-md" v-model="user.email" float-label="Email" placeholder="gigi@gmail.com" />
        <q-input class="q-mb-md" v-model="user.password" float-label="Senha" type="password" />

        <q-btn
          color="negative"
          @click="closeSingUp"
          label="Cancelar"
        />
        <q-btn
          color="positive"
          class="float-right"
          @click="signUp"
          label="Cadastrar"
        />
      </div>
    </q-modal>

    <q-modal v-model="openSignIn">
      <div class="q-pl-md q-pr-md q-pb-md">
        <h3>Login</h3>
        <q-input class="q-mb-md" v-model="login.email" float-label="Login" placeholder="Digite seu login(e-mail)..." />
        <q-input class="q-mb-md" v-model="login.password" float-label="Password" placeholder="Digite sua senha..." type="password" />

        <q-btn
          color="negative"
          @click="closeSingIn"
          label="Cancelar"
        />
        <q-btn
          color="positive"
          class="float-right"
          @click="signIn"
          label="Logar"
        />
      </div>
    </q-modal>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { CustomUsersService } from '../resource'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      openSignUp: false,
      openSignIn: false,
      login: {
        email: '',
        password: ''
      },
      user: {
        realm: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    userLogged: {
      get () {
        return this.$store.getters['user/isLogged']
      }
    },
    userState: {
      get () {
        return this.$store.state.user
      }
    },
    cartItems: {
      get () {
        return this.$store.state.cart.items
      }
    }
  },
  validations: {
    user: {
      email: { required, email },
      username: { required },
      realm: { required },
      password: { required }
    },
    login: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    openURL,
    clearUser () {
      this.user.realm = ''
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
    },
    closeSingUp () {
      this.openSignUp = false
      this.clearUser()
    },
    closeSingIn () {
      this.openSignIn = false
      this.clearUser()
    },
    async signIn () {
      this.$v.login.$touch()
      if (this.$v.login.$error) {
        this.$q.notify('Por favor, preencha todos os campos.')
        return
      }
      try {
        // make login the user
        let response = await this.$store.dispatch('user/login', {
          email: this.login.email,
          password: this.login.password
        })
        if (response) {
          this.$q.notify({ message: 'Login feito com sucesso!', color: 'positive' })
        } else {
          this.$q.notify('Não foi possível realizar o login!')
        }
        this.closeSingIn()
      } catch (error) {
        this.$q.notify('Não foi possível realizar o login!')
      }
    },
    async signUp () {
      this.$v.user.$touch()
      if (this.$v.user.$error) {
        this.$q.notify('Por favor, preencha todos os campos.')
        return
      }

      try {
        await CustomUsersService.create('', this.user)
        this.$q.notify({ message: 'Cadastro realizado com sucesso!', color: 'positive' })
        this.closeSingUp()
      } catch (err) {
        this.$q.notify('Não foi possível realizar o cadastro!')
      }
    },
    makeLogout () {
      this.$store.dispatch('user/logout')
      this.$q.notify({ message: 'Logout realizado com sucesso!', color: 'positive' })
      this.finishRequest = true
    }
  }
}
</script>

<style>
</style>
