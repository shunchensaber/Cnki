package com.cnki.njit.crawl.Util;

import com.google.common.collect.Lists;
import struct.DataField;

import java.util.Collections;
import java.util.List;


public class HeapSort {

	/**
	 * ����k����topK ����
	 * @param dataList ���󼯺�
	 * @param k topk
	 * @return ����������k������
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
	 * ��ʼ����
	 * @param retList �Ѽ���
	 * @param dataList ���ݼ���
	 * @param k top�ѵĴ�С
	 */
	private static void createHeap(List<DataField> retList, List<DataField> dataList, int k) {
		
		//�����ݲ����СΪk�ļ�����
		for( int i=dataList.size()-1,j=0; j<k; i--,j++ ) {
			retList.add(dataList.get(i));
			dataList.remove(i);
		}
		
		//����Ϊ��
		adjustObjHeap(retList,0);
	}
	
	/**
	 * ��������
	 * @param retList ��
	 * @param i �����������Ľڵ�
	 */
	private static void adjustObjHeap(List<DataField> retList, int i) {
		
		//��ȡi���ڽڵ�����ӽڵ�
		int left = left(i);
		//��ȡi���ڽڵ�����ӽڵ�
		int right = right(i);
		//��¼3���ڵ�����Сֵ���ڵĽڵ�
		int min = i;
		int length = retList.size();
		//���ӽڵ���� ���ҽڵ�ֵС�ڸ��ڵ�ֵ
		if( left<length &&  -1 == retList.get(left).compareTo(retList.get(i)) ) {
			min = left;
		}//���ӽڵ���� ���ҽڵ�ֵС����ǰ����Сֵ
		if( right<length && -1 == retList.get(right).compareTo(retList.get(min)) ) {
			min = right;
		}
		//�ӽڵ�Ϊ��Сֵ ֱ�ӷ��� ���ٲ���
		if( min == i ) return;
		//�������ڵ�������ӽڵ��н�С��ֵ
		swapObj(retList,i,min);
		//���������µ������������ӽڵ��е���
		adjustObjHeap(retList, min);
		
	}
	
	/**
	 * �����ڵ�λ��
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
	 * ���µĶ���������
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
     * ��ȡ�ҽ��������±�
     * @param i
     * @return
     */
    private static int right(int i){
        return (i + 1) << 1;
    }

    /**
     * ��ȡ����������±�
     * @param i
     * @return
     */
    private static int left(int i){
        return ((i + 1) << 1) - 1;
    }

}
	
	

