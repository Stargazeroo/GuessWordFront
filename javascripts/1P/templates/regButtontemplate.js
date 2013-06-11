<div id="regButton">
<% for (var item in this) { %>
	<button name="<%=this[item].name%>"><%=this[item].value %></button>
<% } %>
</div>