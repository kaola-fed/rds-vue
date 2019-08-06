<template>
    <div>
        <ks-auth-provider :authUrl="authUrl" :authParam="authParam">
            <div>
                <ks-auth urlKey="test">
                    <p>limited content</p>
                </ks-auth>
            </div>
            <p>this is a passage</p>
        </ks-auth-provider>

        <!-- <ks-auth-provider class="f-mt20"
            :authUrl="authUrl" :authParam="authParam"
            :dataAuthUrl="dataAuthUrl" :dataAuthParam="dataAuthParam">
            <div>
                <ks-auth urlKey="test">
                    <p>limited content</p>
                </ks-auth>
            </div>
            <p>this is a passage</p>
        </ks-auth-provider>

        <ks-auth-provider class="f-mt20"
            :authUrl="authUrl" :authParam="authParam"
            :dataAuthUrl="dataAuthUrl" :dataAuthParam="dataAuthParam">
            <div>
                <ks-auth urlKey="test" :dataOpUrl="dataOpUrl" :dataOpParam="dataOpParam">
                    <p>limited content</p>
                </ks-auth>
            </div>
            <p>this is a passage</p>
        </ks-auth-provider> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      authUrl: 'https://nei.netease.com/api/apimock/d006bd9dcbfc2d76c67cb8629e805516/api/post/displayUrl',
      authParam: [
        {
          urlKey: 'test',
          requestUrl: 'http://baidu.com',
        },
      ],
      dataAuthUrl: 'http://localhost:8083/isDisplayLinks2',
      dataAuthParam: {
        value1: 123,
      },
      dataOpUrl: 'http://localhost:8083/isDisplayLinks3',
      dataOpParam: {
        value2: 123,
      },
      urlKey: '',
      transferAuthResult(result) {
        console.log(result);
        return result;
      },
    };
  },
};
</script>
