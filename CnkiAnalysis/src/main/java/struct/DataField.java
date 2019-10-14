package struct;

public class DataField implements Comparable<DataField> {

	public String getContent() {
		return content;
	}
	public Integer getCount() {
		return count;
	}
	
	DataField(){
	}
	DataField(String content){
		this.content = content;
	}
	public DataField(String content, Integer count){
		this.content = content;
		this.count = count;
	}
	
	private String content;
	private Integer count;
	public void setContent(String content) {
		this.content = content;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "DataField [content=" + content + ", count=" + count + "]";
	}
	@Override
	public int compareTo(DataField o) {
		// TODO Auto-generated method stub
		if( count > o.count ) return 1;
		else return -1;
		//return 0;
	}
	//重写 equals 和 hashCode方法 便于set实体泛型对象去重
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return count.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if( obj instanceof DataField) {
			DataField data = (DataField) obj;
			return content.equals(data.content);
		}
		return super.equals(obj);
	}
}
