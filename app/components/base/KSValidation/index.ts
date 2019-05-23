import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'kl-validation',
})
export default class KLValidation extends Vue {
    private controls: any[] = [];

    private async validate() {
        try {
        await Promise.all(this.controls.map(control => new Promise(async (resolve, reject) => {
            if (!control || !control.validate) {
            return;
            }

            const { valid, message } = await control.validate();
            if (!valid) {
            return reject({ valid, message });
            }
            return resolve();
        })));
        return { valid: true };
        } catch (err) {
        return { valid: false, message: err.message };
        }
    }
}
