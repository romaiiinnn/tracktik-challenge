<template>
      <main class="infinite-wrapper mdl-layout__content mdl-color--grey-100">

        <div class="mdl-cell header-site">
			<section class="mdl-grid">
                <n-link :to="{path: '/', query: {search: $route.query.search}}" class="middle">
	                <i class="material-icons mdl-color-text--white">keyboard_arrow_left</i>
	            </n-link>
	            <div class="middle section__circle-container mdl-cell mdl-cell--1-col mdl-cell--2-col-desktop">
	                <!-- <img class="circle-img" src="https://lorempixel.com/640/480/city/"> -->
	                <lazy-image class="circle-img" src="https://lorempixel.com/640/480/city/"/>
	            </div>
	            <div class="middle section__text mdl-cell mdl-cell--2-col mdl-cell--4-col-desktop">
	              <div class="mdl-color-text--white"><b>{{data.title}}</b></div>
	              <div><i>{{data.contacts.main.address.city}}, {{data.contacts.main.address.country}}</i></div>
	              <div>{{data.contacts.main.firstName}} {{data.contacts.main.lastName}}</div>
	            </div>
	      	</section>
        </div>

		<section class="full-width center site-details mdl-grid bckg-color-dark img-container">
            <!-- <img class="full-width" src="https://lorempixel.com/640/480/city/"> -->
		  <lazy-image
		    class="main-img"
		    src="https://lorempixel.com/640/480/city/"
		  />
      	</section>

		<section class="mdl-grid site-details-line">
            <div class="middle section__circle-container mdl-cell mdl-cell--1-col mdl-cell--2-col-desktop">
                <i class="center material-icons">person</i>
            </div>
            <div class="middle section__text mdl-cell mdl-cell--3-col mdl-cell--4-col-desktop">
              <div>{{data.contacts.main.firstName}} {{data.contacts.main.lastName}}</div>
              <div class="gray">{{data.contacts.main.jobTitle}}</div>
            </div>
      	</section>
		<section class="mdl-grid site-details-line"  @click="openPhoneNumber(data.contacts.main.phoneNumber)">
            <div class="middle section__circle-container mdl-cell mdl-cell--1-col mdl-cell--2-col-desktop">
                <i class="center material-icons">call</i>
            </div>
            <div class="middle section__text mdl-cell mdl-cell--3-col mdl-cell--4-col-desktop">
              <div>{{data.contacts.main.phoneNumber}}</div>
            </div>
      	</section>
		<section class="mdl-grid site-details-line" @click="openMail(data.contacts.main.email)">
            <div class="middle section__circle-container mdl-cell mdl-cell--1-col mdl-cell--2-col-desktop">
                <i class="center material-icons">email</i>
            </div>
            <div class="middle section__text mdl-cell mdl-cell--3-col mdl-cell--4-col-desktop">
              <div>{{data.contacts.main.email}}</div>
            </div>
      	</section>
		<section class="mdl-grid site-details-line" @click="openGoogleMap(data.address)">
            <div class="middle section__circle-container mdl-cell mdl-cell--1-col mdl-cell--2-col-desktop">
                <i class="center material-icons">room</i>
            </div>
            <div class="middle section__text mdl-cell mdl-cell--3-col mdl-cell--4-col-desktop">
              <div>{{data.address.street}}</div>
              <div>{{data.address.city}}, {{data.address.zipCode}}</div>
              <div>{{data.address.state}}, {{data.address.country}}</div>
            </div>
      	</section>

  	</main>
</template>

<script>

import axios from '~/plugins/axios'
import LazyImage from 'v-lazy-image'

export default {
	components:{
    	LazyImage,
	},
	async asyncData ({route, params, store}) {
		const id = route.params.id

    	let site = store.state.sites.find(site => site.id === id)
    	
    	// if the site details has not already been fetched
    	if(!site){
    		const {data} = await axios.get(`${store.state.apiUrl}/sites/${id}`)
    		site = data
    	}

	    return { 
	      context: process.static ? 'static' : (process.server ? 'server' : 'client'),
	      data: site
	    }
	},
	methods:{
		openPhoneNumber: number => window.open(`tel:${number}`, '_blank'),
		openMail: email => window.open(`mailto:${email}`, '_blank'),
		openGoogleMap: address => window.open(`https://maps.google.com/?q=${Object.values(address).join('+')}`, '_blank')
	}
};
</script>

<style scoped>

.site-details {
	border-bottom: 0.5px solid gray;
	padding: 0;
}

.header-site {
	margin: 0;
	width: 100%;
	background-color: #2a77e4;
	color: black;
}

.mdl-chip__contact {
	margin-right: 0;
}

.back-arrow {
	color: white;
	width: 2em;
}

.full-width {
	width: auto;
	/*height: 300px;*/
}

.site-details-line {
	padding: 1em;
}

.main-img {
    flex: none; /* keep aspect ratio */
    width: auto;
    height: 100%
}

.img-container {
    display: flex;
    justify-content: center;
    height: 280px; /* or other desired height */
    overflow: hidden;
}
</style>