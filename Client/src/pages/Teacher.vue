<template>
  <q-page padding>
   <q-toolbar color="primary">
     <q-btn flat round dense icon="school" />
  <!--
    For Toolbar title, we use
    QToolbarTitle component
  -->
  <q-toolbar-title>
    Perfil o Professor
  </q-toolbar-title>

  <!--
    In a Toolbar, buttons are best
    configured as "flat, round, dense" and with an icon,
    but any button will do
  -->
</q-toolbar>
<br>
    <div class="row">
          <div class="col-md-2 col-12">
            <q-card>
              <q-card-media>
                <img src="~assets/teacher.png" height="180px" width="180px">
              </q-card-media>
              <q-card-title>
                <div :title="nameProfessor">{{nameProfessor}}</div>
                <q-rating slot="subtitle" v-model="starsProfessor" :max="5" :title="stars" readonly/>
              </q-card-title>
              <q-card-main>
                <p class="text-faded">{{bio}}</p>
              </q-card-main>
            </q-card>
          </div>
        </div>
  </q-page>
</template>

<script>
export default {
  name: 'Teacher',
  data () {
    return {
      comment: '',
      stars: 0,
      views: 1,
      bio: 'Biografia do professor .',
      totalAvaliations: 0,
      value: '00,00',
      ementa: `<b>O que é Java?</b><br/>
              <ul>
                <li>Introdução</li>
                <li>A plataforma Java</li>
                <li>Benefício da JVM</li>
                <li>Quais características?</li>
                <li>Quais sistemas?</li>
                <li>Bytecode vs EXE?</li>
                <li>Sobre o Bytecode</li>
                <li>Para saber mais: o nome Bytecode</li>
                <li>O que aprendemos?</li>
              </ul>`,

      // Professor
      nameProfessor: 'Nome Professor',
      starsProfessor: 1,
      testimonials: [
        {
          id: 1,
          date: '01/05/2019',
          text: 'How are you?',
          name: 'Usuario 1'
        },
        {
          id: 2,
          date: '02/05/2019',
          name: 'Usuario 2',
          text: 'I\'m good, thank you!'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
