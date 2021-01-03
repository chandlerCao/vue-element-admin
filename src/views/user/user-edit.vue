<template>
    <user-info-form
        ref="userInfoForm"
        @submit-form-handler="editUserInfo"
        submit-btn-name="修改用户"
        :user-data="userData"
    ></user-info-form>
</template>

<script>
import userInfoForm from '../register/user-info-form'
export default {
    name: 'user-edit',
    components: { userInfoForm },
    data() {
        return { userData: {} }
    },
    props: {
        uid: {
            type: String,
            default: '',
        },
    },
    watch: {
        uid: {
            handler() {
                this.getUserInfo()
            },
            immediate: true,
        },
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            this.userData = await this.$req(this.$api.user.getUserInfo, {
                uid: this.uid,
            })
        },
        // 修改用户信息
        editUserInfo(userFormData) {
            userFormData.uid = this.uid
            this.$req(this.$api.user.editUserInfo, userFormData)
                .then(() => {
                    this.$router.push({ name: '用户管理' })
                })
                .finally(() => {
                    try {
                        this.$refs.userInfoForm.$refs.userForm.submitLoading = false
                    } catch (error) {
                        error
                    }
                })
        },
    },
}
</script>