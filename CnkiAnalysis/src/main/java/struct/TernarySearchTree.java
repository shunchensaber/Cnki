package struct;


import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
/**
 * Created on 18/3/4.
 */
public class TernarySearchTree implements AutoComplete {

	//���ڵ�
    private TernaryNode root;
    //�ʵ��С
    private int size;

    public TernarySearchTree() {
    }

    public int size() {
        return size;
    }


    @Override
    /**
     *  ���һ���ؼ���
     *  @param text 
     */
    public void add(String text) {
    	//�������Ƿ�����ô�  ������size++ ���Ҽ�����������
        if (!contains(text)) size++;
        root = add(text, 0, root);
        
    }
    

    @Override

    /**
     * ���������Ƿ������text
     * @param text 
     * @return boolean �����ôʣ�true ��֮��false
     */
    public boolean contains(String text) {
    	//�ַ���Ϊ��ֱ�ӷ���false 
        if (null == text || text.isEmpty()) return false;
        //�ݹ����
        TernaryNode node = contains(text, 0, root);
        //�ڵ㲻Ϊ�� �� ����һ�����ʵ�ĩβ�ַ�������false(��������û�иõ���) 
        return null != node && node.end;
    }
    
    /**
     * �ݹ���ҵ����ַ�
     * @param text �ַ���
     * @param index ��ǰ�Ƚϵ��ַ��±�
     * @param node ��ǰ�ڵ�
     * @return text�����һ���ַ����ڵĽڵ�
     */
    private TernaryNode contains(String text, int index, TernaryNode node) {

        if (null == text || text.isEmpty() || null == node) return null;
        char curr = text.charAt(index);

        //С�������������ݹ� ���������������ݹ�
        if (curr < node.label) {
            return contains(text, index, node.left);
        } else if (curr > node.label && null != node.right) {
            return contains(text, index, node.right);
        } else if (index + 1 == text.length()) {//ǰ�� curr == node.label
        	//��ǰ�±����ַ���������� ֱ�ӷ��ص�ǰ�ڵ�
            return node;
        } else //����� ���м�ݹ���һ���ַ�
            return contains(text, index + 1, node.mid);
    }
    
    /**
     * ����ַ���
     * @param text 
     * @param index ��ӵ��ַ��±�
     * @param node ��ǰ�ݹ����ڵĽڵ�
     * @return
     */
    public TernaryNode add(String text, int index, TernaryNode node) {

        char curr = text.charAt(index);

        //��ǰ�ڵ�Ϊ�� ���õ�ǰ�ַ��½���ǰ�ڵ�
        //���������curr == node.label �϶����� ����ֱ�ӽ���mid�ڵ� ���ص�ǰ�ڵ㣿����
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
     * ͨ��List ������
     */
    @Override
    public void build(List<String> texts) {
        // TODO more efficient?
        texts.forEach(t -> {
            this.add(t);
        });
    }

    /**
     * ��prefix������ַ���
     * @param node ������ʼ�ڵ�
     * @param prefix ǰ׺
     * @param keys ����
     */
    private void traverse(TernaryNode node, StringBuilder prefix, List<String> keys) {
    	//�ڵ�Ϊ��ʱ ֹͣ�ݹ�
        if (null == node) return;
        //����ݹ�
        traverse(node.left, prefix, keys);
        //�ڵ�ݹ鵽��ʱ ǰ׺+�������ڵ��ַ�=ǰ׺��ͬ�������ַ��� ���뼯��
        if (node.end) keys.add(prefix.toString() + node.label);
        traverse(node.mid, prefix.append(node.label), keys);
        //ɾ��β���ַ� �ұߵݹ�
        prefix.deleteCharAt(prefix.length() -1);
        traverse(node.right, prefix, keys);
    }

    @Override
    /**
     * ����ȫ��
     */
    public Iterable<String> keys() {
        List<String> keys = new LinkedList<>();
        traverse(root, new StringBuilder(), keys);
        return keys;

    }

    @Override
    /**
     * ����ǰ׺ƥ��
     * @param prefix 
     * @return ƥ����ַ�������
     */
    public Iterable<String> keysWithPrefix(String prefix) {
        List<String> keys = new LinkedList< >();
        //����ǰ׺prefix���ڵ����ڵ� 
        TernaryNode node = contains(prefix, 0, root);
        if (null == node) return keys;
        //���������һ�������ַ��� ���뼯��
        if (node.end) keys.add(prefix);
        //��ǰ׺�����ʼ�ݹ�ƥ��
        traverse(node.mid, new StringBuilder(prefix), keys);
        return keys;
    }
}
