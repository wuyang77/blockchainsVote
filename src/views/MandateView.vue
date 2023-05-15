<script setup>
    //0xdF87b260602793862d3232FbB03c242A13c67AFA


    import useWeb3 from "../hooks/useWeb";
    import { ref,onMounted } from 'vue';
    const { web3,voteContract,getAccount } = useWeb3();

    //定义主持人信息
    const host = ref("");
    
    //获取主持人信息
    const getHost = async () => {
        host.value = await voteContract.methods.host().call();
    } 
    //选民地址
    const voterAddress = ref("");  
    //分发票权
    const mandate = async () => {
        const arr = eval(voterAddress.value);
        const account = await getAccount();
        voteContract.methods.mandate(arr).send({from: account}).on('receipt',() => {
            console.log("选票分发成功");
        })
    }
    

    onMounted(async() => {
        await getHost();
    });
    /*
        0xdF87b260602793862d3232FbB03c242A13c67AFA
        0xCEfa92CC39D499eACef770843335dd58D7fEb639
        0xA719aB5A372F07b50cB5Da9301866C1AF446c650
        0x3B6822BcadcB121Dc909C52E651A78fcf974f83E
        ["0x270568473ff858c8d3bcf0b28bea88a273cc7814","0x270568473ff858c8d3bcf0b28bea88a273cc7814","0x41EA3Aaf861fbaF14E4166553d250d87523c2896","0xc836EBB222213a3dc617EBe39497F9A04c4eBBa7"]
    */
</script>
<template>
    <div class="box1">
        <van-divider>分发票权</van-divider>
        <div class="host">
            <van-space>
                <p class="label"><van-icon name="manager"/>主持人地址</p>
                <p class="address">{{ host }}</p>
            </van-space>
        </div>
        <div>
            <van-space>
                <p class="label"><van-icon name="friends-o"/>投票人地址</p>
                <textarea class="votors" v-model="voterAddress"></textarea>
            </van-space>
        </div>
        <div class="btn">
            <van-button block @click="mandate">开始分发选票</van-button>
        </div>
    </div>
</template>

<style lang="less">

</style>