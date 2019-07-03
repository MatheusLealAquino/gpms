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
        <q-btn-dropdown :disabled="this.favorites.length === 0"
          icon="favorite" flat class="q-ml-auto">
          <center class="q-pt-md">Lista de Desejos</center>
          <q-list
            style="height:30vh; padding:20px; overflow-y: scroll;"
            v-for="item in this.favorites"
            :key="item.id">
            <q-item link :to="'/course/'+item.id">
              <q-icon name="favorite" size="35px" class="q-pr-sm" color="primary"/>
              <q-item-main :label="item.title.substring(0, 30)" />
              <q-btn icon="cancel" flat size="15px" color="red" @click="unfav(item.id)"/>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown :disabled="this.cartItems.length === 0"
          icon="shopping_cart" flat>
            <center class="q-pt-md">Carrinho de Compras</center>
            <div style="height:30vh; padding:20px; overflow-y: scroll;">
              <q-list
                v-for="item in this.cartItems"
                :key="item.id">
                <q-item>
                  <q-icon name="favorite" size="35px" class="q-pr-sm" color="primary"/>
                  <q-item-main :label="item.title.substring(0, 30)" />
                  <q-btn :to="'/course/'+item.id" flat class="q-ml-sm" color="primary" label="Ver"/>
                  <q-btn icon="cancel" flat size="15px" color="red" v-close-overlay @click="removeItem(item)"/>
                </q-item>
              </q-list>
            </div>
            <div class="text-center">
              <q-btn class="full-width" color="primary" label="Comprar Cursos" v-close-overlay @click="willBuy = !willBuy"/>
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
          <q-btn color="black" icon="home" flat label="Início" class="full-width q-mr-sm" to="/"/>
        </q-item>
        <q-item>
          <q-btn color="black" icon="timeline" flat label="Timeline" class="full-width q-mr-sm" to="/timeline"/>
        </q-item>
        <q-item v-if="userLogged">
          <q-btn color="black" icon="book" flat label="Meus cursos" class="full-width q-mr-sm" to="/myCourses"/>
        </q-item>
        <q-item v-if="!userLogged">
          <q-btn color="black" icon="input" flat label="Cadastre-se" class="full-width q-mr-sm" @click="openSignUp=!openSignUp"/>
        </q-item>
        <q-item v-if="!userLogged">
          <q-btn color="black" icon="settings_power" flat label="Logar" class="full-width q-mr-sm" @click="openSignIn=!openSignIn"/>
        </q-item>
        <q-item v-if="userLogged">
          <q-btn color="black" icon="exit_to_app" flat label="Sair" class="full-width q-mr-sm" @click="makeLogout"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-modal v-model="willBuy">
      <div class="q-pl-md q-pr-md q-pb-md">
        <h3>Realizar compra</h3>
        <div style="height:30vh; overflow-y: scroll;">
          <q-list
            v-for="item in this.cartItems"
            :key="item.id">
            <q-item>
              <q-icon name="favorite" size="30px" class="q-pr-sm" color="primary"/>
              <q-item-main :label="item.title.substring(0, 30)" />
              <q-btn icon="cancel" flat size="15px" color="red" @click="removeItem(item)"/>
              <div class="q-pl-sm"> R$ {{item.price.toFixed(2)}} </div>
            </q-item>
          </q-list>
        </div>
        <q-input class="q-mb-md" v-model="codeDiscount" float-label="Cupom" placeholder="Digite um cupom valido" />

        <div class="q-mb-sm">
          <b>Total:</b> R$ {{ priceOfCart().toFixed(2) }}<br>
        </div>

        <q-btn
          color="negative"
          @click="closeWillBuy"
          label="Cancelar"
        />
        <q-btn
          color="positive"
          class="float-right"
          @click="buyCourses"
          label="Comprar"
        />
      </div>
    </q-modal>

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
import { UsersService } from '../resource'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      openSignUp: false,
      openSignIn: false,
      willBuy: false,
      codeDiscount: null,
      totalDiscount: 0,
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
    },
    favorites: {
      get () {
        return this.$store.state.user.favorites
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
    async unfav (id) {
      const message = await this.$store.dispatch('user/fav', { id })
      if (message) {
        this.$q.notify(message)
      }
    },
    removeItem (item) {
      this.$store.dispatch('cart/removeItem', item)
    },
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
    closeWillBuy () {
      this.willBuy = false
      this.codeDiscount = null
    },
    async buyCourses () {
      try {
        this.cartItems.forEach(item => {
          UsersService.update(`${this.userState.id}/purchasedCourses/rel/${item.id}`)
          this.removeItem(item)
        })
        this.willBuy = false
        this.$q.notify({ message: 'Curso(s) comprado(s) com sucesso!', color: 'positive' })
      } catch (err) {
        console.log(err)
      }
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
        await UsersService.create('', this.user)
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
    },
    priceOfCart () {
      let final = 0
      this.cartItems.forEach(item => {
        final += item.price
      })
      return final - this.totalDiscount
    }
  },
  watch: {
    codeDiscount (newVal, oldVal) {
      if (newVal) {
        this.cartItems.forEach(item => {
          if (newVal === item.code) this.totalDiscount = item.discount
          else this.totalDiscount = 0
        })
      } else {
        this.totalDiscount = 0
      }
    }
  }
}
</script>

<style>
</style>
