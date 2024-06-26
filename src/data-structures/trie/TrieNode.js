import HashTable from '../hash-table/HashTable';

export default class TrieNode {
  /**
     * @param {string} character
     * @param {boolean} isCompleteWord
     */
  constructor(character, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  /**
     * @param {string} character
     * @return {TrieNode}
     */
  getChild(character) {
    return this.children.get(character);
  }

  /**
     * @param {string} character
     * @param {boolean} isCompleteWord
     * @return {TrieNode}
     */
  addChild(character, isCompleteWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character);

    // Trong các trường hợp như thêm "car" sau "carpet" chúng ta cần đánh dấu ký tự "r" là hoàn tất.
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

    return childNode;
  }

  /**
     * @param {string} character
     * @return {TrieNode}
     */
  removeChild(character) {
    const childNode = this.getChild(character);

    // Chỉ xoá childNode nếu :
    // - childNode không có nút con,
    // - childNode.isCompleteWord === false.
    if (
      childNode
            && !childNode.isCompleteWord
            && !childNode.hasChildren()
    ) {
      this.children.delete(character);
    }

    return this;
  }

  /**
     * @param {string} character
     * @return {boolean}
     */
  hasChild(character) {
    return this.children.has(character);
  }

  /**
     * Kiểm trả TrieNode hiện tại có nút con hay không.
     * @return {boolean}
     */
  hasChildren() {
    return this.children.getKeys().length !== 0;
  }

  /**
     * @return {string[]}
     */
  suggestChildren() {
    return [...this.children.getKeys()];
  }

  /**
     * @return {string}
     */
  toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
