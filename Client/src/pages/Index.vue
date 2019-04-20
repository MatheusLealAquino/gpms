<template>
  <q-page>

    <q-carousel
      color="white"
      arrows
      quick-nav
      height="50vh"
      width="100%"
    >
      <q-carousel-slide img-src="statics/curso1.jpg" />
    </q-carousel>

    <div class="row gutter-sm q-pl-md q-pr-md q-mb-md">
      <div class="col-md-12"><h1 class="q-display-2">Cursos</h1></div>
      <div class="col-md-3">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/prog1.jpg">
          </q-card-media>
          <q-card-title>
            Programação de Computadores 1
            <q-rating slot="subtitle" v-model="stars" :max="5" />
          </q-card-title>
          <q-card-main>
            <p class="text-faded">Curso com foco para pessoas que nunca tiveram contato com programação.</p>
            <p style="font-size: 20px"><b>Valor:</b> R$ 30,99</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Adicionar ao carrinho" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/prog1.jpg">
          </q-card-media>
          <q-card-title>
            Programação de Computadores 2
            <q-rating slot="subtitle" v-model="stars" :max="5" />
          </q-card-title>
          <q-card-main>
            <p class="text-faded">Para quem terminou programação de computadores 1.</p>
            <p style="font-size: 20px"><b>Valor:</b> R$ 30,99</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Adicionar ao carrinho" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/prog1.jpg">
          </q-card-media>
          <q-card-title>
            Estrutura de Dados
            <q-rating slot="subtitle" v-model="stars" :max="5" />
          </q-card-title>
          <q-card-main>
            <br>
            <p class="text-faded">Curso com foco para pessoas que nunca tiveram contato com programação.</p>
            <p style="font-size: 20px"><b>Valor:</b> R$ 30,99</p>
            <br>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Adicionar ao carrinho" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/prog1.jpg">
          </q-card-media>
          <q-card-title>
            Estrutura de Dados 2
            <q-rating slot="subtitle" v-model="stars" :max="5" />
          </q-card-title>
          <q-card-main>
            <br>
            <p class="text-faded">Curso com foco para pessoas que nunca tiveram contato com programação.</p>
            <p style="font-size: 20px"><b>Valor:</b> R$ 30,99</p>
            <br>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Adicionar ao carrinho" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="row gutter-sm q-pl-md q-pr-md q-mb-md">
      <div class="col-md-12"><h1 class="q-display-2">Professores</h1></div>
      <div class="col-md-2">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/teacher.png">
          </q-card-media>
          <q-card-title>
            Professor 1
            <q-rating slot="subtitle" v-model="stars" :max="5" />
            <div slot="right" class="row items-center">
              <q-icon name="place" /> UFF
            </div>
          </q-card-title>
          <q-card-main>
            <br>
            <p class="text-faded">Professor formado em Ciência da Computação.</p>
            <br>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Ver Perfil" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/teacher.png">
          </q-card-media>
          <q-card-title>
            Professor 2
            <q-rating slot="subtitle" v-model="stars" :max="5" />
            <div slot="right" class="row items-center">
              <q-icon name="place" /> UERJ
            </div>
          </q-card-title>
          <q-card-main>
            <br>
            <p class="text-faded">Professor formado em Ciência da Computação.</p>
            <br>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Ver Perfil" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/teacher.png">
          </q-card-media>
          <q-card-title>
            Professor 3
            <q-rating slot="subtitle" v-model="stars" :max="5" />
            <div slot="right" class="row items-center">
              <q-icon name="place" /> PUC
            </div>
          </q-card-title>
          <q-card-main>
            <br>
            <p class="text-faded">Professor formado em Ciência da Computação.</p>
            <br>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Ver Perfil" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2">
        <q-card inline style="height:100%">
          <q-card-media>
            <img src="~assets/teacher.png">
          </q-card-media>
          <q-card-title>
            Professor 4
            <q-rating slot="subtitle" v-model="stars" :max="5" />
            <div slot="right" class="row items-center">
              <q-icon name="place" /> UFRJ
            </div>
          </q-card-title>
          <q-card-main>
            <br>
            <p class="text-faded">Professor formado em Ciência da Computação.</p>
            <br>
          </q-card-main>
          <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn flat color="primary" label="Ver Perfil" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      stars: 4
    }
  }
}
</script>
