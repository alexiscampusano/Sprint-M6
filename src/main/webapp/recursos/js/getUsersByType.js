$(document)
	.ready(
		function() {
			$('#floatingSelect').change(function() {

				getUsersByType();
			});

			function getUsersByType() {
				const userType = $("#floatingSelect").val();
				$.ajax({
					type: 'POST',
					url: '/springmvcjpa/list-users',
					data: {
						userType: userType
					},
					dataType: 'json',
					success: function(result) {
						console.log(result)
						let tableContainer = $("#table-container");
						tableContainer.addClass("table-responsive");
						tableContainer.empty();

						if (result.length > 0) {
							const table = $("<table>").addClass("table table-striped table-bordered display");
							const thead = $("<thead>").appendTo(table);
							const tbody = $("<tbody>").appendTo(table);

							const headers = Object.keys(result[0]);

							const headerRow = $("<tr>").appendTo(thead);
							headers.forEach(function(header) {
								$("<th>").text(header).appendTo(headerRow);

							});

							result.forEach(function(usuario) {
								let row = $("<tr>").appendTo(tbody);


								Object.values(usuario).forEach(function(value) {

									$("<td>").text(value).appendTo(row);
								});
								let id = usuario.idUsuario;
								let update = $("<td>").appendTo(row);
								let a = $("<a>").addClass("text-success").attr("href", "ServletUpdateUsuario?type=" + type + "&id=" + id).appendTo(update);
								let i = $("<i>").addClass("fa-solid fa-pen-to-square mx-3").appendTo(a);

							});

							tableContainer.append(table);
						} else {
							tableContainer.text("No se encontraron usuarios.");
						}
					}
				});
			}
		})
