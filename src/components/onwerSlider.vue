<template>
	<el-menu :unique-opened="true" :default-active="$route.path" class="slider" background-color="#F4F4F4" text-color="#000"
	 active-text-color="#000" router>
		<el-menu-item index="/onwerInfo">
			<i class="el-icon-menu"></i>
			<span slot="title">个人信息</span>
		</el-menu-item>
		<el-menu-item index="/myTenant">
			<i class="el-icon-menu"></i>
			<span slot="title">租客信息</span>
		</el-menu-item>
		<el-menu-item index="/tenantCharge">
			<i class="el-icon-menu"></i>
			<span slot="title">租客用电</span>
		</el-menu-item>



	</el-menu>
</template>

<script>
	export default {
		name: 'onwerSlider',
		data() {
			return {


			}
		}

	}
</script>
<style scoped>
	.slider {
		height: 100vh;
	}
</style>

<style lang="less">
	.el-menu {
		.el-submenu {
			.el-menu-item {
				padding-left: 92px !important;
			}
		}
	}

	.el-submenu__title:hover {
		background-color: rgba(82, 186, 181, .38) !important;
	}

	.el-menu-item:focus,
	.el-menu-item:hover {
		background-color: rgba(82, 186, 181, .38) !important;
	}
</style>
