package struct;


import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
/**
 * Created on 18/3/4.
 */
public class TernarySearchTree implements AutoComplete {

	//根节点
    private TernaryNode root;
    //词典大小
    private int size;

    public TernarySearchTree() {
    }

    public int size() {
        return size;
    }


    @Override
    /**
     *  添加一个关键词
     *  @param text 
     */
    public void add(String text) {
    	//搜索树是否包含该词  不包含size++ 并且加入搜索树中
        if (!contains(text)) size++;
        root = add(text, 0, root);
        
    }
    

    @Override

    /**
     * 搜索树中是否包含该text
     * @param text 
     * @return boolean 包含该词：true 反之：false
     */
    public boolean contains(String text) {
    	//字符串为空直接返回false 
        if (null == text || text.isEmpty()) return false;
        //递归查找
        TernaryNode node = contains(text, 0, root);
        //节点不为空 且 不是一个单词的末尾字符，返回false(搜索树中没有该单词) 
        return null != node && node.end;
    }
    
    /**
     * 递归查找单个字符
     * @param text 字符串
     * @param index 当前比较的字符下标
     * @param node 当前节点
     * @return text中最后一个字符所在的节点
     */
    private TernaryNode contains(String text, int index, TernaryNode node) {

        if (null == text || text.isEmpty() || null == node) return null;
        char curr = text.charAt(index);

        //小于则向左子树递归 大于则向右子树递归
        if (curr < node.label) {
            return contains(text, index, node.left);
        } else if (curr > node.label && null != node.right) {
            return contains(text, index, node.right);
        } else if (index + 1 == text.length()) {//前置 curr == node.label
        	//当前下标与字符串长度相等 直接返回当前节点
            return node;
        } else //相等则 向中间递归下一个字符
            return contains(text, index + 1, node.mid);
    }
    
    /**
     * 添加字符串
     * @param text 
     * @param index 添加的字符下标
     * @param node 当前递归所在的节点
     * @return
     */
    public TernaryNode add(String text, int index, TernaryNode node) {

        char curr = text.charAt(index);

        //当前节点为空 则用当前字符新建当前节点
        //这种情况下curr == node.label 肯定成立 可以直接进入mid节点 返回当前节点？？？
        if (null == node) {
            node = new TernaryNode(curr);
        }
        if (curr < node.label) {
            node.left = add(text, index, node.left);
        } else if (curr > node.label) {
            node.right = add(text, index, node.right);
        } else if (index + 1 == text.length()) {
            node.end = true;
        } else {
            node.mid = add(text, index + 1, node.mid);
        }
        return node;
    }

    /**
     * 通过List 创建树
     */
    @Override
    public void build(List<String> texts) {
        // TODO more efficient?
        texts.forEach(t -> {
            this.add(t);
        });
    }

    /**
     * 从prefix起查找字符串
     * @param node 查找起始节点
     * @param prefix 前缀
     * @param keys 集合
     */
    private void traverse(TernaryNode node, StringBuilder prefix, List<String> keys) {
    	//节点为空时 停止递归
        if (null == node) return;
        //向左递归
        traverse(node.left, prefix, keys);
        //节点递归到底时 前缀+数据域内的字符=前缀相同的完整字符串 加入集合
        if (node.end) keys.add(prefix.toString() + node.label);
        traverse(node.mid, prefix.append(node.label), keys);
        //删除尾部字符 右边递归
        prefix.deleteCharAt(prefix.length() -1);
        traverse(node.right, prefix, keys);
    }

    @Override
    /**
     * 返回全部
     */
    public Iterable<String> keys() {
        List<String> keys = new LinkedList<>();
        traverse(root, new StringBuilder(), keys);
        return keys;

    }

    @Override
    /**
     * 根据前缀匹配
     * @param prefix 
     * @return 匹配的字符串集合
     */
    public Iterable<String> keysWithPrefix(String prefix) {
        List<String> keys = new LinkedList< >();
        //查找前缀prefix所在的最后节点 
        TernaryNode node = contains(prefix, 0, root);
        if (null == node) return keys;
        //如果本身是一个完整字符串 加入集合
        if (node.end) keys.add(prefix);
        //从前缀的最后开始递归匹配
        traverse(node.mid, new StringBuilder(prefix), keys);
        return keys;
    }
}
