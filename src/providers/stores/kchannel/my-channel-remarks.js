import { writable } from "svelte/store";

const myChannelRemarks = writable([]);
const myChannelRemarkStore = {
   subscribe: myChannelRemarks.subscribe,
   reset: () => myChannelRemarks.set([]),
   update: ({ channelRemarks }) =>
      myChannelRemarks.update((pre) => {
         return channelRemarks;
      }),
   append: ({ newChannelRemarks = [] }) => {
      myChannelRemarks.update((pre) => {
         return [...pre, ...newChannelRemarks];
      });
   },
   deleteById: ({ id }) => {
      myChannelRemarks.update((pre) => {
         let channelRemarkArr = pre;
         const index = channelRemarkArr.findIndex((ele) => ele.id == id);
         if (index >= 0) {
            channelRemarkArr.splice(index, 1);
         }
         return channelRemarkArr
      });
   },
};

export { myChannelRemarkStore, myChannelRemarks };
