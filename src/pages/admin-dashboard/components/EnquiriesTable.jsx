import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnquiriesTable = () => {
  const [selectedEnquiries, setSelectedEnquiries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const enquiries = [
    {
      id: 1,
      clientName: "Priya & Arjun",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      weddingDate: "15/03/2024",
      budget: "₹8,00,000",
      status: "new",
      submittedAt: "2 hours ago",
      venue: "Bangalore Palace",
      guestCount: 300
    },
    {
      id: 2,
      clientName: "Sneha & Vikram",
      email: "sneha.reddy@email.com",
      phone: "+91 87654 32109",
      weddingDate: "22/04/2024",
      budget: "₹12,00,000",
      status: "contacted",
      submittedAt: "1 day ago",
      venue: "Leela Palace",
      guestCount: 450
    },
    {
      id: 3,
      clientName: "Kavya & Rohit",
      email: "kavya.nair@email.com",
      phone: "+91 76543 21098",
      weddingDate: "10/05/2024",
      budget: "₹15,00,000",
      status: "converted",
      submittedAt: "3 days ago",
      venue: "ITC Windsor",
      guestCount: 500
    },
    {
      id: 4,
      clientName: "Ananya & Karthik",
      email: "ananya.iyer@email.com",
      phone: "+91 65432 10987",
      weddingDate: "28/02/2024",
      budget: "₹6,00,000",
      status: "archived",
      submittedAt: "1 week ago",
      venue: "Taj West End",
      guestCount: 200
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: 'bg-warning text-warning-foreground', label: 'New' },
      contacted: { color: 'bg-info text-info-foreground', label: 'Contacted' },
      converted: { color: 'bg-success text-success-foreground', label: 'Converted' },
      archived: { color: 'bg-text-secondary text-background', label: 'Archived' }
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredEnquiries = filterStatus === 'all' 
    ? enquiries 
    : enquiries.filter(enquiry => enquiry.status === filterStatus);

  const handleSelectEnquiry = (id) => {
    setSelectedEnquiries(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEnquiries.length === filteredEnquiries.length) {
      setSelectedEnquiries([]);
    } else {
      setSelectedEnquiries(filteredEnquiries.map(enquiry => enquiry.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for enquiries:`, selectedEnquiries);
    setSelectedEnquiries([]);
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border-light">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Recent Enquiries</h3>
            <p className="text-sm text-text-secondary">Manage and respond to client enquiries</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>
            
            {selectedEnquiries.length > 0 && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleBulkAction('contact')}
                  iconName="Mail"
                  iconPosition="left"
                  className="text-sm"
                >
                  Contact ({selectedEnquiries.length})
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleBulkAction('archive')}
                  iconName="Archive"
                  iconPosition="left"
                  className="text-sm"
                >
                  Archive
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedEnquiries.length === filteredEnquiries.length && filteredEnquiries.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Client Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Wedding Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {filteredEnquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-surface transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedEnquiries.includes(enquiry.id)}
                    onChange={() => handleSelectEnquiry(enquiry.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{enquiry.clientName}</p>
                    <p className="text-sm text-text-secondary">{enquiry.email}</p>
                    <p className="text-sm text-text-secondary">{enquiry.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{enquiry.weddingDate}</p>
                    <p className="text-sm text-text-secondary">{enquiry.venue}</p>
                    <p className="text-sm text-text-secondary">{enquiry.guestCount} guests</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-text-primary">{enquiry.budget}</p>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(enquiry.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      iconName="Eye"
                      onClick={() => console.log('View enquiry', enquiry.id)}
                      className="p-2"
                      title="View Details"
                    />
                    <Button
                      variant="ghost"
                      iconName="Mail"
                      onClick={() => console.log('Contact client', enquiry.id)}
                      className="p-2"
                      title="Contact Client"
                    />
                    <Button
                      variant="ghost"
                      iconName="MoreHorizontal"
                      onClick={() => console.log('More actions', enquiry.id)}
                      className="p-2"
                      title="More Actions"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEnquiries.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Inbox" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">No enquiries found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default EnquiriesTable;