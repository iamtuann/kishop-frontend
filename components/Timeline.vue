<template>
  <div class="timeline">
    <div v-for="(item, index) in orderTimeline" :key="index" 
      class="item group pb-3 min-h-[50px]"
      :class="{ 'completed': index < currentIndex, 'current': index == currentIndex }"
    >
      <div class="flex items-center justify-center h-6 min-w-[24px]">
        <div class="dot"></div>
      </div>
      <div class="flex text-sm md:text-base ml-2 group-[.current]:text-blue-600">
        <p class="font-medium leading-6 w-[120px] md:min-w-[180px]">
          {{ item.title }}
        </p>
        <div class="mt-1 leading-5" v-if="item.id">
          <div class="font-medium">{{ formatDateFull(new Date(item.date)) }}</div>
          <div class="opacity-80">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderHistory, OrderStatus } from '~/types';
import { formatDateFull } from "~/utils";

const props = defineProps({
  items: { type: Array as PropType<OrderHistory[]>, required: true},
})

const items = toRef(props.items)
type OrderProcess = {
  status: OrderStatus,
  title: string,
}
const ordreProcess: OrderProcess[] = [
  {
    status: "PENDING",
    title: "Đặt hàng thành công",
  },
  {
    status: "CONFIRMED",
    title: "Đã xác nhận",
  },
  {
    status: "SHIPPING",
    title: "Đang vận chuyển",
  },
  {
    status: "COMPLETED",
    title: "Hoàn thành",
  },
]

items.value.sort((a, b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
})
const currentStatus = items.value[items.value.length -1]

const currentIndex = ordreProcess.findIndex(process => process.status == currentStatus.orderStatus);
const remainStatus = ordreProcess.slice(currentIndex + 1) as unknown as OrderHistory[];

const orderTimeline: OrderHistory[] = [...items.value, ...remainStatus];

</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  position: relative;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: lightgray;
  position: relative;
  flex-shrink: 0;
}

.item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 12px;
  border-width: 1px;
  height: calc(100%);
  border-color: lightgray;
  border-style: dashed;
}

.item.completed .dot {
  background-color: #4caf50;
}
.item.completed::before {
  border-color: #4caf50;
  border-style: solid;
}

.item.current .dot {
  background-color: #0078d6;
  width: 24px;
  height: 24px;
  border: 2px solid lightgray;
}
.item.current::before {
  
}
</style>
