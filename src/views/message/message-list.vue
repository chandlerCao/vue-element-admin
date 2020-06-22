<template>
	<comp-container>
		<comp-complex-table
			:form-data="queryForm"
			:table-data="tableData"
			:request-method="async (args) => $req($api.message.getMessageList, args)"
		></comp-complex-table>
		<el-dialog title="留言回复列表" :visible.sync="mrdDatas.visible" width="90%" top="50px">
			<div style="height: 60vh;">
				<message-reply-list v-if="mrdDatas.visible" :mid="mrdDatas.curMid"></message-reply-list>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="mrdDatas.visible = false">关 闭</el-button>
			</span>
		</el-dialog>
	</comp-container>
</template>

<script>
import messageReplyList from './message-reply-list'
export default {
	name: 'messageList',
	inheritAttrs: false,
	components: { messageReplyList },
	data() {
		return {
			// 表格查询表单
			queryForm: {
				formData: {
					searchValue: {
						label: '留言信息',
						attrs: {
							placeholder: '支持：留言id/留言内容/留言留言人'
						}
					},
					datePicker: {
						label: '留言时间段',
						el: 'el-date-picker',
						attrs: {
							type: 'daterange',
							valueFormat: 'yyyy-MM-dd'
						}
					}
				},
				formAttrs: {
					size: 'mini',
					inline: true,
					labelWidth: '90px'
				},
				submitBtn: {
					name: '查询留言'
				},
				resetBtn: {
					name: '重置'
				}
			},
			// 表格数据
			tableData: {
				primaryKey: 'mid',
				// 表头
				tableColumn: [
					{
						prop: 'mid',
						label: 'ID',
						attrs: {
							width: 220
						}
					},
					{
						prop: 'content',
						label: '留言内容'
					},
					{
						prop: 'user',
						label: '留言人'
					},
					{
						prop: 'uip',
						label: '留言人ip'
					},
					{
						prop: 'city',
						label: '留言人城市'
					},
					{
						prop: 'like_count',
						label: '点赞数'
					},
					{
						prop: 'reply_count',
						label: '回复数'
					},
					{
						prop: 'date',
						label: '留言日期',
						attrs: {
							width: 160
						}
					}
				],
				// 操作按钮
				tableHandleBtns: {
					width: 240,
					// 删除功能
					delete: {
						btn: {
							name: '删除留言',
							message: '确认将当前留言吗？'
						},
						deleteReq: async args => {
							// 表格删除接口
							return this.$req(
								this.$api.message.deleteMessage,
								args
							)
						}
					},
					customBtns: [
						{
							btn: {
								name: '对应回复',
								attrs: {
									type: 'primary',
									size: 'mini',
									icon: 'el-icon-chat-dot-round',
									loading: false
								}
							},
							handler: row => {
								this.mrdDatas.visible = true
								this.mrdDatas.curMid = row.mid
							}
						}
					]
				}
			},
			// 留言对应回复弹框
			mrdDatas: {
				visible: false,
				curMid: ''
			}
		}
	}
}
</script>

<style lang="less"></style>