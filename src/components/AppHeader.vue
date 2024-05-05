<template>
    <div class="header">
        <div class="center">
            <Navigation></Navigation>
            <UserStatus :key="$router.currentRoute.value.fullPath" style="justify-self: end;"></UserStatus>
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style scoped>
@import url('/src/assets/style/HeaderStyle.css');
</style>