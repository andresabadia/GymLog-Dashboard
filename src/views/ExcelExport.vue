<template>
  <div class="excel-export">
    <h1>This is an excel export page</h1>
    <form action="php/index.php" target="_blank" method="POST">
      <input type="hidden" name="gym_id" value="uf">  
      <input type="hidden" name="month" value="2019-04">  
      <button class="btn btn-warning" type="submit">Excel Export</button>
    </form>
  </div>
</template>


