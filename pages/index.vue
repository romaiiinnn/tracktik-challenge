<template>
      <main class="infinite-wrapper mdl-layout__content mdl-color--grey-100">

        <div class="mdl-layout__header-row header-2">
          <span class="mdl-layout-title center">Sites</span>
        </div>

        <div class="mdl-layout__header-row filters">
          <div class="mdl-cell--1-col mdl-cell--2-col-tablet mdl-cell--2-col-desktop">
          		{{$store.state.meta.lastSearch ? `"${$store.state.meta.lastSearch}..."` : `All sites`}}
      		</div>
          <div class="mdl-cell--1-col mdl-cell--4-col-tablet mdl-cell--4-col-desktop">
          	<i class="material-icons" role="presentation">arrow_drop_down</i>
          </div>
          <div class="mdl-cell--2-col mdl-cell--4-col-desktop search-cell">
	          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable-right is-dirty is-upgraded" data-upgraded=",MaterialTextfield">
	            <div class="mdl-textfield__expandable-holder">
	              <input class="mdl-textfield__input" type="text" id="search" v-model.lazy="searchInput">
	            </div>
	            <label class="mdl-button mdl-js-button mdl-button--icon" for="search" data-upgraded=",MaterialButton">
	              <i class="material-icons">search</i>
	            </label>
	          </div>
			</div>
        </div>

		<hr class="separator">

		<section v-for="site in $store.state.sites" class="site-item mdl-color--white mdl-grid">
            <div class="middle section__circle-container mdl-cell mdl-cell--1-col mdl-cell--2-col-tablet mdl-cell--2-col-desktop">
                <lazy-image alt="" class="circle-img" src="https://lorempixel.com/640/480/city/" />
                <!-- the http link is super slow, https is fast -->
                <!-- <img class="circle-img" :src="site.images[0]"> -->
            </div>
            <div class="middle section__text mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet">
              <div><b>{{site.title}}</b></div>
              <div><i>{{site.contacts.main.address.city}}, {{site.contacts.main.address.country}}</i></div>
              <div>{{site.contacts.main.firstName}} {{site.contacts.main.lastName}}</div>
            </div>
            <n-link :to="{name: 'site/id', params: {id: site.id}, query: {search: $route.query.search}}" class="right-arrow middle right section__circle-container mdl-cell mdl-cell--1-col">
                <i class="material-icons black">keyboard_arrow_right</i>
            </n-link>
      	</section>

      <no-ssr>
      	<infinite-loading ref="infiniteLoading" @infinite="nextInfiniteScroll">
		  <div slot="no-more" class="infiniteMessage">End of results</div>
		  <div slot="no-results" class="infiniteMessage">End of results</div>
      	</infinite-loading>
      </no-ssr>

  	</main>
</template>

<script>

import axios from '~/plugins/axios'
import InfiniteLoading from 'vue-infinite-loading'
import LazyImage from 'v-lazy-image'

export default {
	components: {
		InfiniteLoading,
    	LazyImage,
	},
  	watchQuery: ['search'],
	async asyncData ({route, params, store}) {
	    const searchQuery = route.query.search ? route.query.search : ''

	    // if the search query is different from the last search, we reset it in the store
	    if(searchQuery !== store.state.meta.lastSearch){
	    	store.commit('init')
	    }

	    // if no data in store to display, we fetch it
		if(!store.state.sites.length){
			await store.dispatch('fetchNextSites', {
				search: searchQuery,
				page:   1
			})
		}

	    return {
			context: process.static ? 'static' : (process.server ? 'server' : 'client'),
			searchInput: searchQuery,
	    }
	},
	watch:{
		// source of truth for the search
		searchInput(newVal){
			const query = newVal ? {search: newVal} : {}

			//set search query in URL
        	this.$router.push({query})
        	
        	//reset lastSearch and lastPage from the store
        	this.$store.commit('init')
        	
        	//reset the infiniteLoading (if ever it was set as completed in a previous query)
        	this.$refs.infiniteLoading.stateChanger.reset()
			
			//we fetch the first page of results
			this.$store.dispatch('fetchNextSites', {
				page: 	1, 
				search: newVal
			})
		},
		search(newVal){ 
        	this.searchInput = newVal //will call the watcher on searchInput above
		},
	},
	methods: {
	    nextInfiniteScroll(infiniteScroll){
			this.$store.dispatch('fetchNextSites', {
				infiniteScroll, 
				page: 	this.$store.state.meta.lastPage+1, 
				search: this.$store.state.meta.lastSearch
			})
	    },
	},
};
</script>

<style scoped>

.site-item {
	border-bottom: 0.5px solid gray;
}

.header-2 {
	padding: 0;
}

.mdl-chip__contact {
	margin-right: 0;
}

.infiniteMessage {
	padding: 1em;
	color: gray; 
}

.right-arrow {
	padding-right: 2em;
}

.search-cell {
	text-align: right;
}

.searchActive {
	color: #2a77e4;
	text-shadow: 3px 3px 6px #2a77e4;
}
</style>