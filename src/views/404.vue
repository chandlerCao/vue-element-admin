<template>
	<div id="404" class="mianBox comp-container">
		<img src="~@/assets/img/yun0.png" alt class="yun yun0" />
		<img src="~@/assets/img/yun1.png" alt class="yun yun1" />
		<img src="~@/assets/img/yun2.png" alt class="yun yun2" />
		<img src="~@/assets/img/bird.png" alt class="bird" />
		<img src="~@/assets/img/san.png" alt class="san" />
		<div class="tipInfo">
			<div class="in">
				<div class="textThis">
					<h2>出错啦404！</h2>
					<p>
						<span>
							页面自动
							<router-link :to="{name: '首页'}">跳转</router-link>
						</span>
						<span>
							等待
							{{second}}秒
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'page-404',
	data() {
		return {
			second: 6
		}
	},
	created() {
		this.go()
	},
	methods: {
		go() {
			this.second--
			if (this.second === -1) {
				this.$router.push({ name: '首页' })
				return
			}
			setTimeout(() => {
				this.go()
			}, 1000)
		}
	}
}
</script>

<style lang="less">
.mianBox {
	background-color: #d2f5f1;
	position: relative;
}
.mianBox > img {
	position: absolute;
}
.yun0 {
	right: -140px;
	top: 30px;
	webkit-animation: cloudLarge 105s infinite;
	-moz-animation: cloudLarge 105s infinite;
	-o-animation: cloudLarge 105s infinite;
	animation: cloudLarge 105s infinite;
}
.yun1 {
	left: 5%;
	top: 48%;
	-webkit-animation: cloudSmall 105s infinite;
	-moz-animation: cloudSmall 105s infinite;
	-o-animation: cloudSmall 105s infinite;
	animation: cloudSmall 105s infinite;
}
.yun2 {
	left: 16%;
	top: 35%;
	-webkit-animation: cloudMedium 105s infinite;
	-moz-animation: cloudMedium 105s infinite;
	-o-animation: cloudMedium 105s infinite;
	animation: cloudMedium 105s infinite;
}
.san {
	left: 10%;
	top: 20%;
	-webkit-animation: dn400 3s 0s ease both;
	-moz-animation: dn400 3s 0s ease both;
	animation: dn400 3s 0s ease both;
}
.bird {
	left: 27%;
	top: 15%;
	-webkit-animation: flying 3s infinite;
	-moz-animation: flying 3s infinite;
	-o-animation: flying 3s infinite;
	animation: flying 3s infinite;
}
.man {
	left: 400px;
	top: 310px;
	z-index: 7;
	-webkit-animation: hide 2s 0.5s infinite;
	-moz-animation: hide 2s 0.5s infinite;
	-o-animation: hide 2s 0.5s infinite;
	animation: hide 2s 0.5s infinite;
}
.picv {
	left: 15%;
	top: 390px;
}
.tipInfo {
	position: absolute;
	z-index: 99;
	margin-left: 150px;
	border: 4px solid #c0ece7;
	border-color: rgba(192, 237, 232, 07);
	border-radius: 5px;
	derbackground: #c0ece7;
	background: rgba(192, 237, 232, 07);
	width: 360px;
	left: 30vw;
	top: 40vh;
}
.tipInfo .in {
	background: #fff;
	padding: 0 10%;
}
.tipInfo .in h2 {
	line-height: 50px;
	font-size: 30px;
	color: #e94c3c;
	border-bottom: 1px dashed #aacdd5;
	padding: 18px 0;
}
.tipInfo .in p {
	padding: 30px 0 50px 0;
	text-align: center;
	color: #289575;
}
.tipInfo .in p span {
	margin: 0 20px;
}
.tipInfo .in p span a {
	color: #e94c3c;
	margin: 0 10px;
}
.tipInfo .in .desc {
	overflow: hidden;
	font-size: 14px;
	color: #2b2b2b;
	padding: 0 10%;
}
.tipInfo .in .desc h3 {
	font-weight: normal;
	padding: 20px 0 5px 0;
}
.tipInfo .in .desc li {
	// background: url('../~@/assets/img/404/dot.png') no-repeat left center;
	// margin-left: 5px;
	// padding: 5px 0;
	// padding-left: 8px;
	// *padding-left: 20px;
}
@keyframes cloudLarge {
	0% {
		right: -140px;
	}
	100% {
		right: 118%;
	}
}
@keyframes cloudSmall {
	0% {
		left: 5%;
	}
	100% {
		left: 105%;
	}
}
@keyframes cloudMedium {
	0% {
		left: 16%;
	}
	100% {
		left: -18%;
	}
}
@keyframes light {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 100;
	}
}
@keyframes hide {
	0% {
		opacity: 100;
	}
	100% {
		opacity: 0;
	}
}
@keyframes flying {
	0% {
		margin-top: 0px;
	}
	50% {
		margin-top: 6px;
	}
	100% {
		margin-top: 0px;
	}
}
@keyframes flying {
	0% {
		margin-top: 0px;
	}
	50% {
		margin-top: 6px;
	}
	100% {
		margin-top: 0px;
	}
}
@keyframes dn400 {
	0% {
		opacity: 0;
		transform: translateY(-400px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>