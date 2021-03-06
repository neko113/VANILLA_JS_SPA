function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.$target = document.createElement("ul");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "public/images/file.png"
              : "public/images/directory.png";

          return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}">
            <div>${node.name}</div>
          </div>
        `;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="public/images/prev.png"></div>${nodesTemplate}`
        : nodesTemplate;
    }
  };

  this.$target.addEventListener("click", (event) => {
    const $node = event.target.closest(".Node");

    if ($node) {
      const { nodeId } = $node.dataset;

      if (!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);

      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });

  this.render();
}

export default Nodes;
