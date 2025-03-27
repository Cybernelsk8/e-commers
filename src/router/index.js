import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/Layout.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: Layout,
			children: [
				{
					path : '',
					name: 'Home',
					component : () => import('@/views/Home.vue'),
				},
				{
					path : '/product/:slug',
					name: 'ProductDetails',
					component : () => import('@/views/ProductDetails.vue'),
					props: true
				},
				{
					path : '/category/:categorySlug',
					name: 'ProductsCategory',
					component : () => import('@/views/ProductsCategory.vue'),
					props: true
				},
			]
		}
	],
})

export default router
