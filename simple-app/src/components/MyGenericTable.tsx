interface MyGenericTableProps {
data:any;
columns:any
}

export function MyGenericTable({columns,data}:MyGenericTableProps){
return (
  <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-2">
    <h1 className="text-3xl font-bold">Player ranks</h1>
    <p>Hard coded</p>
    <div className="overflow-x-auto w-full max-w-[70%]">
      <table className="table table-zebra table-xl">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Age</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Player1</td>
            <td>25</td>
            <td>Silver</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Player2</td>
            <td>30</td>
            <td>Gold</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Player3</td>
            <td>22</td>
            <td>Bronze</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Player4</td>
            <td>28</td>
            <td>Platinum</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Player5</td>
            <td>24</td>
            <td>Diamond</td>
          </tr>
          <tr>
            <th>6</th>
            <td>Player6</td>
            <td>27</td>
            <td>Silver</td>
          </tr>
          <tr>
            <th>7</th>
            <td>Player7</td>
            <td>29</td>
            <td>Gold</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
}
