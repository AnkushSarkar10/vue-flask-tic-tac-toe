<script setup lang='ts'>

</script>

<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <h2 class="display-7">
                                Wiating for server . . .
                            </h2>
                            <p class="">
                                cold starts 🥶🥶🥶
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    position: relative;
    top: 35%;
}

.modal-content {
    background-color: #262626;
    color: #f5f5f5;
    min-height: 220px;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.modal-body > p{
    color: #9ca3af;
    font-size: 15px;
}
</style>