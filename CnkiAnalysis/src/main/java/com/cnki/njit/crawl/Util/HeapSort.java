package com.cnki.njit.crawl.Util;

import com.google.common.collect.Lists;
import struct.DataField;

import java.util.Collections;
import java.util.List;


public class HeapSort {

	/**
	 * 根据k进行topK 排序
	 * @param dataList 对象集合
	 * @param k topk
	 * @return 集合中最大的k个对象
	 */
	public static List<DataField> sort(List<DataField> dataList, int k) {
		
		if( dataList.size()<=k ) {
			Collections.sort(dataList, Collections.reverseOrder());
			return dataList;
		}else {
			List<DataField> retList = Lists.newArrayListWithCapacity(k);
			createHeap(retList,dataList, k);
			for( DataField obj : dataList  ) {
				insert(retList, obj);
			}
			Collections.sort(retList, Collections.reverseOrder());
			return retList;
		}
	}

	/**
	 * 初始化堆
	 * @param retList 堆集合
	 * @param dataList 数据集合
	 * @param k top堆的大小
	 */
	private static void createHeap(List<DataField> retList, List<DataField> dataList, int k) {
		
		//将数据插入大小为k的集合中
		for( int i=dataList.size()-1,j=0; j<k; i--,j++ ) {
			retList.add(dataList.get(i));
			dataList.remove(i);
		}
		
		//调整为堆
		adjustObjHeap(retList,0);
	}
	
	/**
	 * 调整子树
	 * @param retList 堆
	 * @param i 待调整子树的节点
	 */
	private static void adjustObjHeap(List<DataField> retList, int i) {
		
		//获取i所在节点的左子节点
		int left = left(i);
		//获取i所在节点的右子节点
		int right = right(i);
		//记录3个节点中最小值所在的节点
		int min = i;
		int length = retList.size();
		//左子节点存在 并且节点值小于父节点值
		if( left<length &&  -1 == retList.get(left).compareTo(retList.get(i)) ) {
			min = left;
		}//左子节点存在 并且节点值小于先前的最小值
		if( right<length && -1 == retList.get(right).compareTo(retList.get(min)) ) {
			min = right;
		}
		//子节点为最小值 直接返回 不再操作
		if( min == i ) return;
		//交换根节点和左右子节点中较小的值
		swapObj(retList,i,min);
		//交换后重新调整被交换的子节点中的树
		adjustObjHeap(retList, min);
		
	}
	
	/**
	 * 交换节点位子
	 * @param retList
	 * @param i
	 * @param j
	 */
	private static void swapObj(List<DataField> retList, int i, int j) {
		
		DataField temp = retList.get(i);
		retList.set(i, retList.get(j));
		retList.set(j, temp);
	}
	
	/**
	 * 将新的对象插入堆中
	 * @param retList
	 * @param obj
	 */
	private static void insert(List<DataField> retList, DataField obj) {
		if( obj.compareTo(retList.get(0)) == 1) {
			retList.set(0, obj);
			adjustObjHeap(retList, 0);
		}
	}
	

    /**
     * 获取右结点的数组下标
     * @param i
     * @return
     */
    private static int right(int i){
        return (i + 1) << 1;
    }

    /**
     * 获取左结点的数组下标
     * @param i
     * @return
     */
    private static int left(int i){
        return ((i + 1) << 1) - 1;
    }

}
	
	

