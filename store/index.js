import axios from '~/plugins/axios'

const apiUrl = `https://tracktik-challenge.staffr.com`

export const state = () => ({
	me: {},
	sites: [],
	meta: {
		lastSearch: '',
		lastPage: 0,
	},
	lastFetchedPage: 0,
	apiUrl
})

export const actions = {
	async fetchMyInfo({ commit }) {
	    const {data} = await axios.get(`${apiUrl}/me`)
	    commit('setMyInfo', data)
	},
	async fetchNextSites({ state, commit }, {infiniteScroll = null, page = 1, search = ''}) {
	    commit('setMeta', {lastPage: page, lastSearch: search})

	    const url    = `${apiUrl}/sites?_page=${page}&q=${search}`
	    
	    const {data} = await axios.get(url)

	    commit('addSites',    data)
		
		if(infiniteScroll){
			//to avoid infinite loop on reload, we force a delay
			setTimeout(() => data.length ? infiniteScroll.loaded() : infiniteScroll.complete(), 1000)
		}
	},
}

export const mutations = {
	setMyInfo: 		(state, data) 	=> state.me    			 = data,
	addSites:  		(state, data) 	=> state.sites 			 = [...state.sites, ...data],
	setLastPage: 	(state, page) 	=> state.meta.lastPage   = page,
	setMeta: 		(state, meta) 	=> state.meta   		 = meta,
	init: 			(state) => {
		state.meta  = { lastSearch: '', lastPage: 0 }
		state.sites = []
	},
	resetSites: state => state.sites = [],
}

export const getters = {

}