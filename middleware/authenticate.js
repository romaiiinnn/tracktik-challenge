export default async ({ store, redirect }) => { 
	if(!store.state.me.id){
    	await store.dispatch('fetchMyInfo')
	}
}