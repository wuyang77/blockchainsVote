<script setup>
    import { ref,onMounted } from 'vue';
    import useWeb3 from "@/hooks/useWeb";
    const { web3,voteContract,getAccount } = useWeb3();

    //看板信息
    const board = ref([]);
    const account = ref('');

    const attainBoardInfo = async () => {
        const result = await voteContract.methods.getBoardInfo().call();
        board.value = result;
    };

    const vote = async (index) => {
        const account = await getAccount();
        const result = await voteContract.methods.vote(index).send({ from:account })
        console.log(result);
    };

    const delegate = () => {
        voteContract.methods.delegate(delegatorAddress.value).send({ from: account.value}).on('receipt',(event) => {
            console.log('委托成功！');
        })
    }

    const initEventListen = () => {
        voteContract.events.voteSuccess({ fromBlock: 0 },(err,event) => {
            console.log("监听执行");
            console.log(event);
        }).on('data',(event) => {
           console.log("智能合约触发的事件",event) 
        })
    };
    onMounted(async() => {
        await attainBoardInfo();
    });
</script>
<template>
    <div class="box3">
        <van-divider>投票看板</van-divider>
        <van-cell :title="item.votedName" icon="shop-o" v-for="(item,index) in board">
            <!-- 是通 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-button type="danger" @click="vote(index)">{{ item.totalAmountOfvoted }}</van-button>
            </template>
        </van-cell>
    </div>
</template>

<style lang="less">

</style>