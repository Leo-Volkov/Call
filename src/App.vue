<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005';

import { RouterView } from 'vue-router';
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
	components: {
		ElConfigProvider,
	},
	setup() {
		return {
			zIndex: 3000,
			size: 'small',
		}
	},
})
</script>

<template>
	<el-config-provider :size="size" :z-index="zIndex">
		<div class="app">
			<router-view></router-view>
		</div>
	</el-config-provider>
</template>

<style >
* {
	margin: 0;
	/* padding: 0; */
}
body {
  padding-bottom: 35px;
}
</style>