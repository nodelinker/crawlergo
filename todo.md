# todo-list


* 打开tab页后，必须等待所有事件完成后才能退出而不是用sleep等待，一旦网络异常返回的数据会非常的不稳定。

* 改造，单个tab页，解析所有link包括ajax click等操作。这里面的问题是如何保证ajax或js dom这类的异步操作能够同步得到结果后再退出（理想状态）。
* chrome 通过intercept截获的动态连接，需要记录其content-type只有html页面才需要新打开一个tab进行爬取。
* 提交表单指向内部的iframe时，后面js click点击会出一些奇怪的bug。