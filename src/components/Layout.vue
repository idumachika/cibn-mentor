<template>
    <div class="container-scroller">
        <v-dialog/>
        <slot name="head"></slot>
        <!-- partial:partials/_navbar.vue -->
        <HeaderNav/>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <LeftNav/>
            <!-- partial:partials/_sidebar.vue-->
            <slot name="body"></slot>
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
</template>

<script>
    import LeftNav from './Navigation/LeftNav';
    import HeaderNav from './Navigation/HeaderNav';
    import Route from '../router';
   

    export default {
        name: "Layout",
        components: {
         LeftNav,
         HeaderNav
        },
    }
</script>

<style scoped>

</style>