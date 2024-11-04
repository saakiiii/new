import { useSelector } from "react-redux";
import Card from "./Card";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";

export default function GridLayout({items, deletebase, recoverbase, openinvite, route, acceptinvite, rejectinvite}) {
  // console.log(items);
  // console.log(route);
  // const [items, setItems] = useState(null);
  // useEffect(()=>{
    // setItems(items_);

  // })
  console.log("items", "route", items);
  const searchterm = useSelector((state)=>state.searchReducer);
  console.log("searchterm", searchterm.st);
  if(items != null && searchterm.st != null){  

    const filterdata = items.filter((item)=> item.basename.includes(searchterm.st));
    console.log(filterdata);
    items = filterdata;
  }
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 g-10 p-4">
    <>
        {items == null?<div className='flex w-[100%] h-[100%] items-center justify-center'>
            <Spinner w={10} h={10}/>
        </div>:<></>}
        {items != null && items.length==0?<div className='flex w-[100%] h-[100%] items-center justify-center'>
              Nothing to show
            </div>:<></>}
        {/* {
          items != null && items.length==0?<div className='flex w-[100%] h-[100%] items-center justify-center'>
              Nothing to show
            </div>:
            items.length==0?<div className='flex w-[100%] h-[100%] items-center justify-center'>
              Nothing to show
            </div>:<></>} */}

    <div className="grid-layout">
        {items != null && items.length>0?items.map(x=>{
          // if(route == 'invites'){
            // console.log(x.created_at.seconds);
            // return <Card baseid={x.baseid} basename={x.basename} langname={x.language} created_at={new Date(x.created_at.seconds * 1000 + Math.round(x.created_at.nanos / 1e6)).toLocaleDateString('en-US', options)} created_by={x.created_by} type={route} accesstype={x.accesstype} acceptinvite={acceptinvite} rejectinvite={rejectinvite}/>;

          // }else if(route=="contribs"){
            // console.log("contribs",x);
            // if(x)
            // if(x.length>0){
            console.log(x.created_at); 
            return <Card baseid={x.baseid} basename={x.basename} langname={x.language} created_at={new Date(x.created_at.seconds * 1000 + Math.round(x.created_at.nanoseconds / 1e6)).toLocaleDateString('en-US', options)} created_by={x.created_by} type={route} accesstype={x.accesstype} deletebase={deletebase} recoverbase={recoverbase} openinvite={openinvite} acceptinvite={acceptinvite} rejectinvite={rejectinvite}/>;
            // }
          // }else{
          
          
              // console.log(x);
              // console.log(x._document.data.value.mapValue.fields);
              // x = x._document.data.value.mapValue.fields;
              // x = x.data();
              // console.log(x);
              // console.log("baseid grid", x.baseid.stringValue);
              // return <Card baseid={x.baseid.stringValue} basename={x.basename.stringValue} langname={x.language.stringValue} created_at={new Date(x.created_at.timestampValue.seconds * 1000 + Math.round(x.created_at.timestampValue.nanos / 1e6)).toLocaleDateString('en-US', options)} created_by={x.created_by.stringValue} deletebase={deletebase} recoverbase={recoverbase} type={x.type.stringValue} accesstype={x.accesstype.stringValue} openinvite={openinvite}/>;

          // }  
        }):<></>
      }

    </div>


    </>
  )
}