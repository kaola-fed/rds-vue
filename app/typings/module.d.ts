import 'vue/types/vue.d.ts';

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue> {
    klvue: {
      handleRequestError?: (result: { code: number, message: string }, err: Error) => any,
      selectUrl?: () => string,
      authUrl?: string,
      transferAuthResult?: (result: any) => {
        urlKey: string,
        url: boolean,
      }[],
    };
  }
}
