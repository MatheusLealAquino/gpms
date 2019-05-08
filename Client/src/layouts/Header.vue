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

        <q-btn-dropdown icon="shopping_cart" flat class="q-ml-auto">
          <div style="height:10vh; padding:20px">Some text as content cart</div>
        </q-btn-dropdown>

        <div v-if="$q.platform.is.desktop">
          <q-btn color="white" outline label="Fazer Login" class="q-mr-sm"/>
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
        <q-item to="/">
          <q-item-side icon="home" />
          <q-item-main label="Início" />
        </q-item>
        <q-item to="/timeline">
          <q-item-side icon="timeline" />
          <q-item-main label="Timeline" />
        </q-item>
        <q-item to="/cart">
          <q-item-side icon="shopping_cart" />
          <q-item-main label="Carrinho de Compras" />
        </q-item>
        <q-item to="/myCourses">
          <q-item-side icon="book" />
          <q-item-main label="Meus cursos" />
        </q-item>
        <q-item to="/singUp">
          <q-item-side icon="input" />
          <q-item-main label="Cadastre-se" />
        </q-item>
        <q-item to="/singIn">
          <q-item-side icon="settings_power" />
          <q-item-main label="Logar" />
        </q-item>
        <q-item to="/logout">
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Sair" />
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

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { UsersService } from '../resource'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      openSignUp: false,
      user: {
        realm: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  validations: {
    user: {
      email: { required, email },
      username: { required },
      realm: { required },
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
    async signUp () {
      this.$v.user.$touch()
      if (this.$v.user.$error) {
        this.$q.notify('Por favor, preencha todos os campos.')
        return
      }

      try {
        await UsersService.create('', this.user)
        this.$q.notify({ message: 'Cadastro realizado com sucesso!', color: 'positive' })
        this.closeSingUp()
      } catch (err) {
        this.$q.notify('Não foi possível realizar o cadastro!')
      }
    }
  }
}
</script>

<style>
</style>
