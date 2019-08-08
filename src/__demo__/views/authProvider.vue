<template>
    <div>
        <ks-auth-provider :authParam="authParam">
            <div>
                <ks-auth urlKey="test">
                    <p>limited content</p>
                </ks-auth>
                <p>this is a passage</p>
            </div>
        </ks-auth-provider>

        <ks-auth-provider class="f-mt20"
            :authParam="authParam"
            :dataAuthUrl="dataAuthUrl" :dataAuthParam="dataAuthParam">
            <div>
                <ks-auth urlKey="test">
                    <p>limited content</p>
                </ks-auth>
            </div>
            <p>this is a passage</p>
        </ks-auth-provider>

        <ks-auth-provider class="f-mt20"
            :authParam="authParam"
            :dataAuthUrl="dataAuthUrl" :dataAuthParam="dataAuthParam">
            <div>
                <ks-auth urlKey="test" :dataOpUrl="dataOpUrl" :dataOpParam="dataOpParam">
                    <p>limited content</p>
                </ks-auth>
            </div>
            <p>this is a passage</p>
        </ks-auth-provider>
    </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>
