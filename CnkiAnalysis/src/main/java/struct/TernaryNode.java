package struct;

import org.springframework.stereotype.Component;

/**
 * Created on 18/3/4.
 * Ternary Search Tree Node
 */
@Component
public class TernaryNode {

	//每个节点有左、中、右3个子节点
    public TernaryNode left, mid, right;
    public char label;
    public boolean end = false;

    public TernaryNode(TernaryNode left, TernaryNode mid, TernaryNode right, char label, boolean end) {
        this.left = left;
        this.mid = mid;
        this.right = right;
        this.label = label;
        this.end = end;
    }

    public TernaryNode(char label) {
        this.label = label;
    }

    public TernaryNode(char label, boolean end) {
        this.label = label;
        this.end = end;
    }

    public TernaryNode() {
    }
}
