import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'mmFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {
        if (items.length === 0 || !value) {
            return items
        }
        return items.filter( (i) => {
            const t = Object.assign({}, i)
            if (!isNaN(t[field])) {
                t[field] += '';
            }
            if (field === 'category') {
                t[field] = t['catName']
            }
            if (field === 'date') {
                return t[field].toLowerCase().substr(0,10).indexOf(value.toLowerCase()) !== -1;
            }
            return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
    }
}