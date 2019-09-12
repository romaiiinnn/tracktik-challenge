<template>
	<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
	    <top-header/>

	    <div class="demo-header demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
	        <header class="demo-drawer-header">
				<img :src="$store.state.me.avatar" class="demo-avatar">
				<div class="demo-avatar-dropdown">
					<span>{{$store.state.me.givenName}}</span>
					<div class="mdl-layout-spacer"></div>
				</div>
	        </header>
	        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
	          <a class="mdl-navigation__link" href="/">
	          	<i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>
	          	Home
	          </a>
	          <div class="mdl-layout-spacer"></div>
	          <a class="mdl-navigation__link" href="https://www.linkedin.com/in/romainfroger" target="_blank">
	          	<span class="">Made with <i class="material-icons love-icon">favorite</i> by <u>Romain Froger</u></span>
	          </a>
	          <!-- <hr> -->
	          <!-- <a class="mdl-navigation__link" href="https://www.linkedin.com/in/romainfroger" target="_blank">
	          	<i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">open_in_new</i>
	          	<span class="">Hire me :)</span>
	          </a> -->
	        </nav>
		</div>

	    <nuxt/>
  </div>
</template>

<script>
import TopHeader from '~/components/Header.vue'

export default {
  components: {
    TopHeader,
  }
};
</script>

<style>
	.mdl-layout__drawer-button {
		background-color: transparent !important;
	}

	span i.love-icon {
		font-size: 1em !important;
		color: red !important;
		margin: 0 !important;
	}
</style>
