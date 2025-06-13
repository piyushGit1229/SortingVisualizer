"use strict";
class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
    }

    // BUBBLE SORT
    BubbleSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            for(let j = 0 ; j < this.size - i - 1 ; ++j) {
                await this.help.mark(j);
                await this.help.mark(j+1);
                if(await this.help.compare(j, j+1)) {
                    await this.help.swap(j, j+1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j+1);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
    }

    // INSERTION SORT
    InsertionSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            let j = i;
            while(j >= 0 && await this.help.compare(j, j+1)) {
                await this.help.mark(j);
                await this.help.mark(j+1);
                await this.help.pause();
                await this.help.swap(j, j+1);
                await this.help.unmark(j);
                await this.help.unmark(j+1);
                j -= 1;
            }
        }
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    // SELECTION SORT
    SelectionSort = async () => {
        for(let i = 0 ; i < this.size ; ++i) {
            let minIndex = i;
            for(let j = i ; j < this.size ; ++j) {
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if(await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "cell done");
        }
    }

    // MERGE SORT
    MergeSort = async () => {
        await this.MergeDivider(0, this.size - 1);
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    MergeDivider = async (start, end) => {
        if(start < end) {
            let mid = start + Math.floor((end - start)/2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid+1, end);
            await this.Merge(start, mid, end);
        }
    }

    Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontcounter = start;
        let midcounter = mid + 1;
        
        while(frontcounter <= mid && midcounter <= end) {
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if(fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            }
            else {
                newList.push(fvalue);
                ++frontcounter;
            }
        }
        while(frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while(midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for(let c = start ; c <= end ; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }
        for(let c = start, point = 0 ; c <= end && point < newList.length; 
            ++c, ++point) {
                await this.help.pause();
                this.list[c].setAttribute("value", newList[point]);
                this.list[c].style.height = `${3.5*newList[point]}px`;
        }
        for(let c = start ; c <= end ; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    QuickSort = async () => {
        await this.QuickDivider(0, this.size-1);
        for(let c = 0 ; c < this.size ; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
    }

    QuickDivider = async (start, end) => {
        if(start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot-1);
            await this.QuickDivider(pivot+1, end);
        }
    }

    Partition = async (start, end) => {
        let pivot = this.list[end].getAttribute("value");
        let prev_index = start - 1;

        await this.help.markSpl(end);
        for(let c = start ; c < end ; ++c) {
            let currValue = Number(this.list[c].getAttribute("value"));
            await this.help.mark(c);
            if(currValue < pivot) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                await this.help.unmark(prev_index);
                Helper.incComparison();
            }
            await this.help.unmark(c);
            Helper.incComparison();
        }
        await this.help.swap(prev_index+1, end);
        await this.help.unmark(end);
        return prev_index + 1;
    }

    // COUNTING SORT
    CountingSort = async () => {
        // Works for non-negative integers up to 100 as generated by randomList
        let maxVal = 100;
        let count = new Array(maxVal + 1).fill(0);
        // Build frequency table
        for (let i = 0; i < this.size; ++i) {
            let val = Number(this.list[i].getAttribute("value"));
            count[val] += 1;
            await this.help.mark(i);
            await this.help.pause();
            window.comparisonCount = (window.comparisonCount || 0) + 1;
            Helper.incComparison();
            await this.help.unmark(i);
        }
        // Write back in ascending order
        let index = 0;
        for (let val = 0; val <= maxVal; ++val) {
            while (count[val] > 0) {
                this.list[index].setAttribute("value", val);
                this.list[index].style.height = `${3.8 * val}px`;
                this.list[index].setAttribute("class", "cell current");
                await this.help.pause();
                window.comparisonCount = (window.comparisonCount || 0) + 1;
                Helper.incComparison();
                this.list[index].setAttribute("class", "cell done");
                index += 1;
                count[val] -= 1;
            }
        }
    }

    // RADIX SORT (LSD) – base 10 for values up to 100
    RadixSort = async () => {
        const getDigit = (num, place) => Math.floor(num / Math.pow(10, place)) % 10;
        const maxDigits = 3; // values <=100 so 3 digits max

        for (let d = 0; d < maxDigits; ++d) {
            // counting sort by digit d
            let buckets = Array.from({ length: 10 }, () => []);
            for (let i = 0; i < this.size; ++i) {
                let val = Number(this.list[i].getAttribute("value"));
                buckets[getDigit(val, d)].push(val);
                await this.help.mark(i);
                await this.help.pause();
                window.comparisonCount = (window.comparisonCount || 0) + 1;
                Helper.incComparison();
                await this.help.unmark(i);
            }
            // rebuild list arrayNode visually
            let idx = 0;
            for (let b = 0; b < 10; ++b) {
                for (let val of buckets[b]) {
                    this.list[idx].setAttribute("value", val);
                    this.list[idx].style.height = `${3.8 * val}px`;
                    this.list[idx].setAttribute("class", "cell current");
                    await this.help.pause();
                    window.comparisonCount = (window.comparisonCount || 0) + 1;
                    Helper.incComparison();
                    this.list[idx].setAttribute("class", "cell");
                    idx += 1;
                }
            }
        }
        // mark all done
        for (let i = 0; i < this.size; ++i) {
            this.list[i].setAttribute("class", "cell done");
        }
    }

    // BUCKET SORT (10 buckets)
    BucketSort = async () => {
        let bucketCount = 10;
        let buckets = Array.from({ length: bucketCount }, () => []);
        // distribute
        for (let i = 0; i < this.size; ++i) {
            let val = Number(this.list[i].getAttribute("value"));
            let index = Math.floor(val / 10); // since values up to 100
            buckets[index].push(val);
            await this.help.mark(i);
            await this.help.pause();
            window.comparisonCount = (window.comparisonCount || 0) + 1;
            Helper.incComparison();
            await this.help.unmark(i);
        }
        // sort each bucket with simple insertion (in-place array sort)
        for (let b = 0; b < bucketCount; ++b) {
            buckets[b].sort((a, b) => a - b);
        }
        // concatenate back
        let idx = 0;
        for (let b = 0; b < bucketCount; ++b) {
            for (let val of buckets[b]) {
                this.list[idx].setAttribute("value", val);
                this.list[idx].style.height = `${3.8 * val}px`;
                this.list[idx].setAttribute("class", "cell current");
                await this.help.pause();
                window.comparisonCount = (window.comparisonCount || 0) + 1;
                Helper.incComparison();
                this.list[idx].setAttribute("class", "cell");
                idx += 1;
            }
        }
        for (let i = 0; i < this.size; ++i) {
            this.list[i].setAttribute("class", "cell done");
        }
    }
};