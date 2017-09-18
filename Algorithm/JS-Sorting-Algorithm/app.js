window.onload = function () {
    const canvas = document.getElementById('canvas'),
          ctx = canvas.getContext('2d');
    let width = window.innerWidth,
        height = window.innerHeight,
        arrLen = document.querySelector('#num').value,
        uh = height / 100,
        uw = width / arrLen,
        sortArr = [],
        tempArr = [],
        aid;

    canvas.width = width;
    canvas.height = height;

    // Handle Resize
    window.addEventListener('resize', function (event) {
        width = window.innerWidth;
        height = window.innerHeight;
        uh = height / 100;
        uw = width / arrLen;
        canvas.width = width;
        canvas.height = height;
    });

    // Handle Array Size Change
    document.querySelector('#num').addEventListener('change', function (event) {
        arrLen = document.querySelector('#num').value;
        randomArr()
        highlight(sortArr)
        show()
    });

    document.querySelector('#render').addEventListener('click', function (event) {
        switch (event.target.id) {
            case 'bubble':
                changeSort(bubble)
                break;
            case 'selection':
                changeSort(selection)
                break;
            case 'insertion':
                changeSort(insertion)
                break;
            case 'shell':
                changeSort(shell)
                break;
            case 'quick':
                changeSort(quickSortView)
                break;
            case 'start':
                cancelAnimationFrame(aid)
                show()
                break;
            case 'numwrap':
                cancelAnimationFrame(aid)
                break;
            default:
                cancelAnimationFrame(aid)
                break;
        }
    })

    /**
     * 生成random数组
     * @param {[num]} length   [description]
     */
    function randomArr() {
        sortArr = [];
        uw = width / arrLen;
        for (let i = 0; i < arrLen; i++) {
            sortArr.push(parseInt(Math.random() * 100));
        }
        tempArr = [...sortArr];
    }
    /**
     * canvas渲染
     * @param  {[Array]} arr [渲染的数组]
     */
    function draw(arr) {
        if (!(arr instanceof Array)) return;
        ctx.clearRect(0, 0, width, height)

        ctx.strokeStyle = 'rgb(0, 0, 0)'
        arr.forEach((x, i) => {
            ctx.fillStyle = x.color;
            ctx.fillRect(i * uw, height, uw, -x.v * uh);
            ctx.strokeRect(i * uw, height, uw, -x.v * uh);
        });
    }

    function bubble(a) {
        // 冒泡排序
        let len = a.length
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    exch(a, j, j + 1)
                }
            }
        }
    }

    function selection(a) {
        //选择排序
        let len = a.length;
        for (let i = 0; i < len; i++) {
            let min = i;
            for (let j = i + 1; j < len; j++) {
                if (a[j] < a[min]) {
                    exch(a, j, min);
                }
            }
        }
    }

    function insertion(a) {
        //插入排序
        let len = a.length;
        for (let i = 1; i < len; i++) {
            for (let j = i; j > 0 && a[j] < a[j - 1]; j--) {
                exch(a, j, j - 1);
            }
        }
    }

    function shell(a) {
        //希尔排序
        let len = a.length;
        let h = 1;
        while (h < len / 3) (h = h * 3 + 1);
        while (h >= 1) {
            for (let i = h; i < len; i++) {
                for (let j = i; j >= h && a[j] < a[j - h]; j -= h) {
                    exch(a, j, j - h);
                }
            }
            h = (h - 1) / 3;
        }
    }

    function quickSort(a) {
        // 快速排序
        let len = a.length;
        if (len <= 1) return a;
        let left = [],
            right = [],
            mid = [a[0]];
        for (let i = 1; i < len; i++) {
            if (a[i] < mid[0]) left.push(a[i]);
            else right.push(a[i]);
        }
        return quickSort(left).concat(mid.concat(quickSort(right)));
    }

    function quickSortView(a, left, right) {
        // 用于可视化的快速排序
        let mid = Math.floor((left + right) / 2)
        let pivot = a[mid]
        let l = left
        let r = right
        while (true) {
            while (a[l] < pivot) {
                l++
            }
            while (a[r] > pivot) {
                r--
            }
            if (r <= l) {
                break;
            }
            exch(a, l, r)
            l++
            r--
        }
        if (left < l - 1)
            quickSortView(a, left, l - 1)
        if (r + 1 < right)
            quickSortView(a, r + 1, right)
    }
    // 交换数值
    function exch(a, i, j) {
        highlight(a, i, j)
        let temp = a[i]
        a[i] = a[j]
        a[j] = temp;
        highlight(a, i, j)
    }

    // 数组内容格式化，为进行交换的元素着色
    function highlight(arr, i, j) {
        tempArr.push(arr.slice(0).map((x, idx) => {
            if (idx == i || idx == j) {
                return {
                    v: x,
                    color: '#226129'
                }
            } else {
                return {
                    v: x,
                    color: 'rgb(74, 216, 137)'
                }
            }
        }));
    }

    function changeSort(callback) {
        cancelAnimationFrame(aid)
        randomArr()
        callback(sortArr, 0, sortArr.length - 1)
        show()
    }
    // 渲染排序过程
    function show() {
        let arr = tempArr.shift();
        draw(arr);
        

        aid = requestAnimationFrame(show)
    }

    randomArr()
    highlight(sortArr)
    show()
};